const fs = require('fs');
const path = require('path');

const carritoFilePath = path.join(__dirname, '../data/carrito.json');

class CartManager {
  async getCart() {
    try {
      const data = await fs.promises.readFile(carritoFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading cart file:', error);
      return null;
    }
  }

  async updateCart(cart) {
    try {
      await fs.promises.writeFile(carritoFilePath, JSON.stringify(cart, null, 2));
      console.log('Cart updated successfully');
    } catch (error) {
      console.error('Error updating cart file:', error);
    }
  }
}

module.exports = CartManager;
