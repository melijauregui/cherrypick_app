// Test script for the updateCatalogRoute with file upload
const csvContent = `name,description,price,brand,image_url,url
Jean celeste 1,Jean celeste recto,29.99,tienda napoli,https://i.pinimg.com/736x/49/08/a4/4908a48e22982e6f112ba25287290215.jpg,https://ar.pinterest.com/pin/80501912085455960/
Jean azul 1,Jean azul recto,49.99,tienda napoli,https://i.pinimg.com/736x/ae/e4/45/aee445d6da668c3a4204926d37875dbe.jpg,https://ar.pinterest.com/pin/10344274146431872/
Jean celeste 2,Jean celeste recto,39.99,tienda napoli,https://i.pinimg.com/736x/cb/e7/68/cbe7689af882fad8546cbd82fc21203f.jpg,https://ar.pinterest.com/pin/906560600028845732/
Jean celeste vintage,Jean celeste vintage recto arremangado,79.99,tienda napoli,https://i.pinimg.com/736x/6c/22/94/6c229431bc4ba9e5797f94a29d3e96d8.jpg,https://ar.pinterest.com/pin/49750770878377093/
Jean flared,Jean flared celeste,49.99,tienda napoli,https://i.pinimg.com/736x/07/87/3e/07873ed18d38f15879e8d9460260729b.jpg,https://ar.pinterest.com/pin/475481673180604864/
Jean negro,Jean negro recto,49.99,tienda napoli,https://i.pinimg.com/736x/84/de/af/84deafae74471e539344ececce27ff27.jpg,https://ar.pinterest.com/pin/6333255723414092/
Jean roto celeste,Jean roto celeste recto,49.99,tienda napoli,https://i.pinimg.com/736x/16/27/e4/1627e4807d0c7a7e045653a269ff1876.jpg,https://ar.pinterest.com/pin/140806228541778/
Jean azul vintage,Jean azul vintage recto,49.99,tienda napoli,https://i.pinimg.com/736x/f3/0f/e6/f30fe65e31f87df82f510f746717ef92.jpg,https://ar.pinterest.com/pin/270708627597606133/
Jean roto una pierna,Jean roto una pierna recto,49.99,tienda napoli,https://i.pinimg.com/736x/53/d6/cf/53d6cf297516c2e0a611fb8b35cf3d3b.jpg,https://ar.pinterest.com/pin/597782550554822752/
Jean mom azul,Jean mom azul,19.99,tienda napoli,https://i.pinimg.com/736x/33/67/f6/3367f6f8f0535f41d82248344fd542fb.jpg,https://ar.pinterest.com/pin/69876231726786229/
Jean cierre,Jean cierre torcido,19.99,tienda napoli,https://i.pinimg.com/736x/95/6b/8a/956b8a9f4a20e4910c876348f5bc0f19.jpg,https://ar.pinterest.com/pin/195484440073043855/
Jean palazzo,Jean palazzo,19.99,tienda napoli,https://i.pinimg.com/736x/9c/48/a2/9c48a2801ef32cfa700ea4f7fa7477cb.jpg,https://ar.pinterest.com/pin/49610033390820882/
Jean vintage remangado,Jean vintage remangado,19.99,tienda napoli,https://i.pinimg.com/736x/1b/4c/62/1b4c62854896d31c357673d6058eedcb.jpg,https://ar.pinterest.com/pin/70437489706563/
Jean gris vintage,Jean gris vintage,19.99,tienda napoli,https://i.pinimg.com/736x/7c/ca/67/7cca67c27bbe6aa2f230b8ee890a41e0.jpg,https://ar.pinterest.com/pin/41165784089945499/
Jean gris claro,Jean gris claro,19.99,tienda napoli,https://i.pinimg.com/736x/f3/47/ba/f347bac18b038ed56d2cb3f76ad88e9f.jpg,https://ar.pinterest.com/pin/13721973860716908/
Jean cierre mom,Jean cierre mom,19.99,tienda napoli,https://i.pinimg.com/736x/03/bc/13/03bc1315b8488252f75bdee315b4765a.jpg,https://ar.pinterest.com/pin/1053138694130282090/
Jean celeste mom,Jean celeste mom,19.99,tienda napoli,https://i.pinimg.com/736x/9b/b7/30/9bb7309937568de6ff0be29750e1c719.jpg,https://ar.pinterest.com/pin/281475045455497409/
Jean celeste vintage,Jean celeste vintage,19.99,tienda napoli,https://i.pinimg.com/736x/4a/59/a1/4a59a148428d56fffd49eae387978147.jpg,https://ar.pinterest.com/pin/7388786884390779/
Jean cinturon rosado,Jean cinturon rosado,19.99,tienda napoli,https://i.pinimg.com/736x/15/ed/8b/15ed8ba6709d763a096b9807b616b59a.jpg,https://ar.pinterest.com/pin/282037995423977700/
Jean wide leg,Jean wide leg celeste,9.99,tienda napoli,https://i.pinimg.com/736x/56/d7/af/56d7af2f0fd819ae72fd050f5027f885.jpg,https://ar.pinterest.com/pin/57139489016966417/
Remera verde, Remera verde de algodón, 29.99,charo,https://i.pinimg.com/736x/ea/4d/bf/ea4dbf3538415b0ea85f62e1e4ac8482.jpg,https://ar.pinterest.com/pin/99501473012502315/
Remera Marrón, Remera Larga Marrón de algodón, 29.99,charo,https://i.pinimg.com/736x/cb/b3/08/cbb308be443a379611fac31dd1d6ab6d.jpg,https://ar.pinterest.com/pin/1011128553843906145/
Remera Beige, Remera Beige sin mangas de algodón, 10.99,charo,https://i.pinimg.com/736x/3c/fa/5b/3cfa5b8d28c35b61b948943657a7e069.jpg,https://ar.pinterest.com/pin/332281278774356667/
Remera Blanca, Remera Blanca de algodón, 10.99,charo,https://i.pinimg.com/736x/1b/4c/86/1b4c86378c1f65bf0c28530f0320a78f.jpg,https://ar.pinterest.com/pin/182677328631359582/
Remera una Manga, Remera una Manga de algodón, 10.99,charo,https://i.pinimg.com/736x/15/59/f1/1559f11514a207a68cec9a51a3791da9.jpg,https://ar.pinterest.com/pin/55943220366818811/
Remera verde lima, Remera verde lima de algodón, 10.99,charo,https://i.pinimg.com/736x/9f/4f/4a/9f4f4abb504170e9b8d213aefc59c02b.jpg,https://ar.pinterest.com/pin/90705379990422160/
Remera gris, Remera gris de algodón, 10.99,charo,https://i.pinimg.com/736x/eb/f3/73/ebf373597d8cf5bccc50d089ceeecc7d.jpg,https://ar.pinterest.com/pin/55943220366818703/
Top Marrón, Top Marrón de algodón, 10.99,charo,https://i.pinimg.com/736x/06/08/f0/0608f0dfd06f53f8c5727402aea288ec.jpg,https://ar.pinterest.com/pin/117797346500072992/
Top Rosa, Top Rosa de algodón, 10.99,charo,https://i.pinimg.com/736x/4c/4e/7f/4c4e7ffaaa7b772669fbe8a200ceb635.jpg,https://ar.pinterest.com/pin/128634133101640829/
Top negro, Top negro de algodón, 10.99,charo,https://i.pinimg.com/736x/61/96/6e/61966e7c1b855272b334b7fb82c7f836.jpg, https://ar.pinterest.com/pin/505177283221426094/
`;

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
