import json
import time
from pathlib import Path
from typing import List, Dict
from uuid import uuid4
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager


BASE_URL = "https://www.rocaly.com.ar"
# LISTING_URL = f"{BASE_URL}/pants/?mpage=2"
LISTING_URL = f"{BASE_URL}/body-tops/?mpage=10"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
    )
}
# OUTPUT_PATH = Path(__file__).parent / "rocaly-pantalones-sample.json"
OUTPUT_PATH = Path(__file__).parent / "rocaly-body-tops-sample.json"


def fetch_soup(url: str) -> BeautifulSoup:
    response = requests.get(url, headers=HEADERS, timeout=30)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def normalize_price(price_el) -> str:
    """Extract and normalize price from price element"""
    if not price_el:
        return "0.00"
    
    # Try data-product-price attribute first (like Charo)
    raw = price_el.get("data-product-price")
    if raw:
        price = int(raw) / 100
        return f"{price:.2f}"
    
    # Otherwise try to extract from text
    price_text = price_el.get_text(strip=True)
    if price_text:
        # Remove currency symbols and extract numbers
        import re
        numbers = re.findall(r'\d+', price_text.replace('.', '').replace(',', '.'))
        if numbers:
            try:
                price = float(numbers[0])
                return f"{price:.2f}"
            except ValueError:
                pass
    
    return "0.00"


def extract_listing() -> List[Dict[str, str]]:
    """Extract all products using Selenium to handle dynamic loading"""
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument(
        "user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
    )
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    try:
        print(f"Loading page: {LISTING_URL}")
        driver.get(LISTING_URL)
        time.sleep(3)  # Wait for initial load
        
        # Click "Mostrar más productos" until no more products
        max_clicks = 50  # Safety limit
        clicks = 0
        
        while clicks < max_clicks:
            try:
                # Find all current product cards
                current_cards = driver.find_elements(By.CSS_SELECTOR, "div.js-item-product")
                current_count = len(current_cards)
                
                print(f"Found {current_count} products so far...")
                
                # Check if there's a "Mostrar más productos" button
                try:
                    load_more_btn = WebDriverWait(driver, 2).until(
                        EC.element_to_be_clickable((By.CSS_SELECTOR, "a.js-load-more, button.js-load-more"))
                    )
                    
                    # Scroll to button
                    driver.execute_script("arguments[0].scrollIntoView(true);", load_more_btn)
                    time.sleep(0.5)
                    
                    # Click the button
                    load_more_btn.click()
                    print(f"Clicked 'Mostrar más productos' (click {clicks + 1})")
                    time.sleep(2)  # Wait for new products to load
                    
                    # Check if new products were loaded
                    new_cards = driver.find_elements(By.CSS_SELECTOR, "div.js-item-product")
                    new_count = len(new_cards)
                    
                    if new_count == current_count:
                        print("No more products loaded. Stopping.")
                        break
                    
                    clicks += 1
                except (TimeoutException, NoSuchElementException):
                    print("No more 'Mostrar más productos' button found. All products loaded.")
                    break
                    
            except Exception as e:
                print(f"Error during loading: {e}")
                break
        
        # Extract all products from the fully loaded page
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        cards = soup.select("div.js-item-product")
        
        items: List[Dict[str, str]] = []
        for card in cards:
            link_el = card.select_one("a.item-link, a.js-product-item-image-link-private")
            name_el = card.select_one(".js-item-name, .item-name")
            price_el = card.select_one(".js-price-display, .item-price")
            
            if not (link_el and name_el):
                continue
            
            # Get product URL
            href = link_el.get("href", "").strip()
            if not href:
                continue
            product_url = urljoin(BASE_URL, href)
            
            # Get product name
            name = name_el.get_text(strip=True)
            
            # Get price
            price = normalize_price(price_el)
            
            items.append(
                {
                    "name": name,
                    "price": price,
                    "url": product_url,
                }
            )
        
        return items
        
    finally:
        driver.quit()


def extract_description(detail_soup: BeautifulSoup) -> str:
    """Extract product description from detail page"""
    # Try product description div
    desc = detail_soup.select_one("#product-description .product-description, #product-description")
    if desc:
        text = desc.get_text(separator=" ", strip=True)
        if text:
            return text
    
    # Try meta description
    og_desc = detail_soup.find("meta", attrs={"property": "og:description"})
    if og_desc and og_desc.get("content"):
        return og_desc["content"].strip()
    
    return ""


def extract_image(detail_soup: BeautifulSoup) -> str:
    """Extract product image URL from detail page"""
    # Try og:image:secure_url first
    image_meta = detail_soup.find(
        "meta", attrs={"property": "og:image:secure_url"}
    ) or detail_soup.find("meta", attrs={"property": "og:image"})
    
    if image_meta and image_meta.get("content"):
        content = image_meta["content"].strip()
        if content.startswith("//"):
            return f"https:{content}"
        return content
    
    # Try to find main product image
    main_img = detail_soup.select_one("#product-form img, .product-item-image-featured img")
    if main_img and main_img.get("src"):
        src = main_img.get("src")
        if src.startswith("//"):
            return f"https:{src}"
        if src.startswith("/"):
            return urljoin(BASE_URL, src)
        return src
    
    return ""


def hydrate_product(card: Dict[str, str], index: int, total: int) -> Dict[str, str]:
    """Fetch detailed information for a product"""
    print(f"Processing {index + 1}/{total}: {card['name']}")
    detail_soup = fetch_soup(card["url"])
    description = extract_description(detail_soup)
    image_url = extract_image(detail_soup)
    time.sleep(0.5)  # Small delay to be respectful to the server
    return {
        "uuid": str(uuid4()),
        "name": card["name"],
        "description": description,
        "price": card["price"],
        "imageUrl": image_url,
        "url": card["url"],
    }


def scrape() -> List[Dict[str, str]]:
    """Main scraping function"""
    listing = extract_listing()
    print(f"Found {len(listing)} items to process")
    return [hydrate_product(card, i, len(listing)) for i, card in enumerate(listing)]


def save_catalog(items: List[Dict[str, str]]) -> None:
    """Save catalog to JSON file"""
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(items, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    catalog_items = scrape()
    save_catalog(catalog_items)
    print(f"\nWrote {len(catalog_items)} items to {OUTPUT_PATH}")

