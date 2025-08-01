const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');

// Models
const User = require('./models/User');
const Product = require('./models/Product');
const StockHistory = require('./models/StockHistory');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads', 'products')));

// Route middleware
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stock', stockRoutes);

// DB sync and start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
});
