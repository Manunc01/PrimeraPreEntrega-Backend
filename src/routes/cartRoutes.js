const express = require('express');
const router = express.Router();
const cartManager = require('../managers/CartManager');

router.post('/', cartManager.createCart);
router.get('/:cid', cartManager.getCart);
router.post('/:cid/product/:pid', cartManager.addProductToCart);

module.exports = router;
