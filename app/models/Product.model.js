import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required!'],
      minlength: [3, 'Name must be at least 3 characters.'],
      maxlength: [100, 'Name cannot exceed 50 characters.'], // تصحیح از 50 به 100
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative.'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required.'],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);