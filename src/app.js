const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');

const productManager = new ProductManager('./data/products.json');

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  const product = await productManager.getProductById(id);
  if (!product) {
    res.status(404).send('Product not found');
  } else {
    res.json(product);
  }
});

// Iniciamos el servidor
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
