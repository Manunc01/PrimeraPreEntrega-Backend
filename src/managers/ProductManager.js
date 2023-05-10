const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PRODUCTS_FILE_PATH = './src/data/productos.json';

const getAllProducts = (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE_PATH));
    const limit = req.query.limit;
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

const getProductById = (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE_PATH));
    const productId = req.params.pid;
    const product = products.find((p) => p.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

const addProduct = (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE_PATH));
    const newProduct = {
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      status: req.body.status !== undefined ? req.body.status : true,
      stock: req.body.stock,
      category: req.body.category,
      thumbnails: req.body.thumbnails || [],
    };
    products.push(newProduct);
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
};

const updateProduct = (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE_PATH));
    const productId = req.params.pid;
    const updatedProduct = {
      id: productId,
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      status: req.body.status,
      stock: req.body.stock,
      category: req.body.category,
      thumbnails: req.body.thumbnails || [],
    };
    const updatedProducts = products.map((p) =>
      p.id === productId ? updatedProduct : p
    );
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(updatedProducts, null, 2));
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

const deleteProduct = (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE_PATH));
    const productId = req.params.pid;
    const filteredProducts = products.filter((p) => p.id !== productId);
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(filteredProducts, null, 2));
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
