import { Product } from '../models/Product.model.js';
import { Category } from '../models/Category.model.js';
import { AppError } from '../utils/AppError.util.js';
import { asyncHandler } from '../middleware/asyncHandler.middleware.js';
import mongoose from 'mongoose';


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

export const getProducts = asyncHandler(async (req, res, next) => {
  const { category } = req.query;

  if (category && (!mongoose.Types.ObjectId.isValid(category))) {
    throw new AppError('Invalid category ID format in query.', 400);
  }

  const query = category ? { category } : {};

  const products = await Product.find(query).populate('category', 'name');

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
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


export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid product ID format.', 400);
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new AppError('Product not found.', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully.',
    data: product,
  });
});


export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new AppError('Invalid product ID format.', 400);

  const existingProduct = await Product.findById(id);
  if (!existingProduct)
    throw new AppError('Product not found.', 404);

  if (typeof name !== 'string' || !name.trim() || name.trim().length < 3)
    throw new AppError('Product name must be a string with at least 3 characters.', 400);

  if (typeof price !== 'number' || isNaN(price) || price < 0)
    throw new AppError('Price must be a valid non-negative number.', 400);

  if (typeof category !== 'string' || !mongoose.Types.ObjectId.isValid(category))
    throw new AppError('Invalid category ID format.', 400);

  const categoryExists = await Category.exists({ _id: category });
  if (!categoryExists)
    throw new AppError('Category does not exist.', 404);

  existingProduct.name = name.trim();
  existingProduct.price = price;
  existingProduct.category = category;

  const updatedProduct = await existingProduct.save();

  res.status(200).json({
    success: true,
    message: 'Product updated successfully (PUT).',
    data: updatedProduct,
  });
});

export const patchProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new AppError('Invalid product ID format.', 400);

  const product = await Product.findById(id);
  if (!product)
    throw new AppError('Product not found.', 404);

  if (updates.name !== undefined) {
    if (typeof updates.name !== 'string' || !updates.name.trim() || updates.name.trim().length < 3)
      throw new AppError('Product name must be a string with at least 3 characters.', 400);
    product.name = updates.name.trim();
  }

  if (updates.price !== undefined) {
    if (typeof updates.price !== 'number' || isNaN(updates.price) || updates.price < 0)
      throw new AppError('Price must be a valid non-negative number.', 400);
    product.price = updates.price;
  }

  if (updates.category !== undefined) {
    if (typeof updates.category !== 'string' || !mongoose.Types.ObjectId.isValid(updates.category))
      throw new AppError('Invalid category ID format.', 400);

    const categoryExists = await Category.exists({ _id: updates.category });
    if (!categoryExists)
      throw new AppError('Category does not exist.', 404);

    product.category = updates.category;
  }

  const updatedProduct = await product.save();

  res.status(200).json({
    success: true,
    message: 'Product updated successfully (PATCH).',
    data: updatedProduct,
  });
});

