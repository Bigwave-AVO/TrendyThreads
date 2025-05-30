import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String, required: true },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// 🔥 This line is important!
const Product = mongoose.model('Product', productSchema);
export default Product;





