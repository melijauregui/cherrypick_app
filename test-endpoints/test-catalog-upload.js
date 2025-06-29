// Test script for the updateCatalogRoute with file upload
const csvContent = `id,name,description,price,brand,image_url,url
1,Camisa Azul,Camisa casual de algodón azul,29.99,Zara,https://i.pinimg.com/736x/49/08/a4/4908a48e22982e6f112ba25287290215.jpg,https://ar.pinterest.com/pin/80501912085455960/
2,Pantalón Negro,Pantalón negro de vestir,49.99,Zara,https://i.pinimg.com/736x/ae/e4/45/aee445d6da668c3a4204926d37875dbe.jpg,https://ar.pinterest.com/pin/10344274146431872/
3,Vestido Floral,Vestido con estampado floral,39.99,Zara,https://i.pinimg.com/736x/cb/e7/68/cbe7689af882fad8546cbd82fc21203f.jpg,https://ar.pinterest.com/pin/906560600028845732/
4,Zapatillas Blancas,Zapatillas deportivas blancas,79.99,Zara,https://i.pinimg.com/736x/6c/22/94/6c229431bc4ba9e5797f94a29d3e96d8.jpg,https://ar.pinterest.com/pin/49750770878377093/`;

// Example of how to call the endpoint with file upload
async function testCatalogUpload() {
  try {
    // Create a File object from the CSV content
    const csvFile = new File([csvContent], "catalog.csv", { type: "text/csv" });

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", csvFile);

    const response = await fetch("http://localhost:3000/update-catalog", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Response:", result);

    if (!result.error) {
      console.log("Valid catalog items:", result.catalogItems);
    } else {
      console.log("Validation error:", result.details);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// // Example with invalid CSV to test error handling
// const invalidCsvContent = `id,name,description,price,image_url,url_page
// 1,Camisa Azul,Camisa casual,invalid_price,https://example.com/camisa.jpg,https://example.com/camisa
// 2,Pantalón Negro,Pantalón negro,49.99,invalid_url,https://example.com/pantalon`;

// async function testInvalidCatalogUpload() {
//   try {
//     const csvFile = new File([invalidCsvContent], "invalid-catalog.csv", {
//       type: "text/csv",
//     });
//     const formData = new FormData();
//     formData.append("file", csvFile);

//     const response = await fetch("http://localhost:3000/update-catalog", {
//       method: "POST",
//       body: formData,
//     });

//     const result = await response.json();
//     console.log("Invalid CSV Response:", result);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// Uncomment to run the tests
testCatalogUpload(); // Should return { error: false, catalogItems: [...] }
// testInvalidCatalogUpload(); // Should return { error: true, details: "línea [2] mal formadas" }
