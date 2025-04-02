
const renderNewProductPage = (data) => {
    const products = data.split("\n").map(line => line.split(","));
  
    let productListHtml = products.map(product => {
      return `<p><strong>${product[0]}:</strong> ${product[1]}</p>`;
    }).join('');
  
    return `
      <html>
        <head><title>New Product</title></head>
        <body>
          <h1>New Product Added</h1>
          ${productListHtml}
        </body>
      </html>
    `;
  };
  

  module.exports = { renderNewProductPage };