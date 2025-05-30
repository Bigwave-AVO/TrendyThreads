// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Classic Tee',
    price: 19.99,
    imageUrl: '/images/tee.jpg',
    description: 'A simple, classic cotton tee.',
    category: 'Shirts',
  },
  {
    name: 'Black Joggers',
    price: 29.99,
    imageUrl: '/images/joggers.jpg',
    description: 'Comfort meets style.',
    category: 'Trousers',
  },
  // …add more as you like
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Product.deleteMany({});         // wipe old data
    await Product.insertMany(sampleProducts);
    console.log('🌱 Database seeded with sample products!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
