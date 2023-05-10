const express = require('express');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');

const app = express();
const PORT = 8080;

app.use(express.json());

// Rutas de productos
app.use('/products', productRoutes);

// Rutas de carritos
app.use('/carts', cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

