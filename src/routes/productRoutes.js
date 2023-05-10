const express = require('express');
const router = express.Router();
const productManager = require('../managers/ProductManager');

router.get('/', productManager.getAllProducts);
router.get('/:pid', productManager.getProductById);
router.post('/', productManager.addProduct);
router.put('/:pid', productManager.updateProduct);
router.delete('/:pid', productManager.deleteProduct);

module.exports = router;
