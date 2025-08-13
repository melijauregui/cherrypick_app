const fs = require("fs/promises");

LOCAL_IP = "localhost";

async function testCatalogUploadJson(brandEmail, filePath) {
  const items = JSON.parse(await fs.readFile(filePath, "utf-8"));
  try {
    const response = await fetch(
      `http://${LOCAL_IP}:3000/insert-catalog-brand2`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandEmail, items }),
      }
    );
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
  "cherrypick.brand.example@gmail.com",
  "test-endpoints/archivos/catalog-items-tienda-napoli.json"
);

setTimeout(() => {
  testCatalogUploadJson(
    "charostoreok@gmail.com",
    "test-endpoints/archivos/catalog-items-charo.json"
  );
}, 5 * 1000);
