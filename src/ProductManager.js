const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProducts();
    const lastProduct = products[products.length - 1];
    const newProduct = {
      id: lastProduct ? lastProduct.id + 1 : 1,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock
    };
    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products));
  }

  getProducts() {
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data) || [];
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, fieldsToUpdate) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      return;
    }
    const updatedProduct = {
      id,
      title: fieldsToUpdate.title || products[productIndex].title,
      description: fieldsToUpdate.description || products[productIndex].description,
      price: fieldsToUpdate.price || products[productIndex].price,
      thumbnail: fieldsToUpdate.thumbnail || products[productIndex].thumbnail,
      code: fieldsToUpdate.code || products[productIndex].code,
      stock: fieldsToUpdate.stock || products[productIndex].stock
    };
    products[productIndex] = updatedProduct;
    fs.writeFileSync(this.path, JSON.stringify(products));
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(filteredProducts));
  }
}

module.exports = ProductManager;
