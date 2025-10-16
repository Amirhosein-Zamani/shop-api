import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'category name is required.'],
      minlength: [3, 'Name must be at least 3 characters.'],
      maxlength: [50, 'Name cannot exceed 50 characters.'],
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model('Category', categorySchema);