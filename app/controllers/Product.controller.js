import { Product } from '../models/Product.model.js';
import { Category } from '../models/Category.model.js';
import { AppError } from '../utils/AppError.util.js';
import { asyncHandler } from '../middleware/asyncHandler.middleware.js';
import {mongoose} from 'mongoose';


export const createProduct = asyncHandler(async(req, res, next) => {
  const {name, price, category} = req.body;

  if (!name || name.trim().length < 3)
    throw new AppError('Product name must be at least 3 characters.', 400);
  if (price < 0)
    throw new AppError('Price cannot be negative.', 400);
  if (!category)
    throw new AppError('Category is required.', 400);
  if (!mongoose.Types.ObjectId.isValid(category)) {
    throw new AppError('Invalid category ID format.', 400);
  }

    const categoryExists = await Category.exists({ _id: category });
  if (!categoryExists)
    throw new AppError('Category does not exist.', 404);

  const product = new Product({ name, price, category });
  const savedProduct = await product.save();
  res.status(201).json({ success: true, data: savedProduct });
});

export const getProducts = asyncHandler(async(req, res, next)=> {
  const{ category } = req.query;
  const query = category ? { category } : {};
  const products = await Product.find(query).populate('category', 'name');
  res.status(200).json(products);
});

export const getProductsByCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new AppError('Invalid category ID format.', 400);
  }

  const categoryExists = await Category.exists({ _id: categoryId });
  if (!categoryExists) {
    throw new AppError('Category not found.', 404);
  }

  const products = await Product.find({ category: categoryId }).populate('category', 'name');

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

export const deleteProduct = asyncHandler(async(req, res, next)=> {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if(!product)
    throw new AppError('Product not found', 404);

  res.status(204).send();
});