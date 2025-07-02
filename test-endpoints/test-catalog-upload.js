const fs = require("fs/promises");

async function testCatalogUploadJson(brand, filePath) {
  const items = JSON.parse(await fs.readFile(filePath, "utf-8"));
  try {
    const response = await fetch("http://localhost:3000/insert-catalog-brand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, items }),
    });
    const result = await response.json();
    console.log("Response:", result);
    if (!result.error) {
      console.log("Valid catalog items uploaded");
    } else {
      console.log("Validation error:", result.details);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

testCatalogUploadJson(
  "tienda napoli",
  "test-endpoints/archivos/catalog-items-tienda-napoli.json"
);
testCatalogUploadJson(
  "charo",
  "test-endpoints/archivos/catalog-items-charo.json"
);
