const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();

// ====== MODELS ======
const User = require('./models/User');
const Product = require('./models/Product');
const StockHistory = require('./models/StockHistory');

// Define associations
Product.hasMany(StockHistory, { foreignKey: 'productId' });
StockHistory.belongsTo(Product, { foreignKey: 'productId' });

app.use(cors({
  origin: 'http://localhost:4200', // Angular app
  credentials: true
}));

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Enable static file serving
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads', 'products')));

// ====== ROUTES ======
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');
const brandRoutes = require('./routes/brandRoutes');
const statsRoutes = require('./routes/statsRoutes');
const reportRoutes = require('./routes/reportRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const chartRoutes = require('./routes/chartRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/charts', chartRoutes);


// ====== DB SYNC & SERVER START ======
sequelize.sync({ alter: true }).then(() => {
  app.listen(5000, () => {
    console.log('✅ Server running on http://localhost:5000');
  });
}).catch((err) => {
  console.error('❌ Failed to sync database:', err);
});
