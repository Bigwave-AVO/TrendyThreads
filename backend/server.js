import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// Load env variables
dotenv.config();

// Import routes
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; // 👈🏽 HERE

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route handlers
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes); // 👈🏽 AND HERE

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


