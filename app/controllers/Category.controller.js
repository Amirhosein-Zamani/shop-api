import { Category } from '../models/Category.model.js';
import {AppError} from '../utils/AppError.util.js'
import { asyncHandler } from '../middleware/asyncHandler.middleware.js';
import mongoose from 'mongoose';

export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().sort({ name: 1 });
  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name.trim() || name.trim().length < 3) {
    throw new AppError('Category name must be a string with at least 3 characters.', 400);
  }

  const duplicate = await Category.findOne({ name: name.trim() });
  if (duplicate) {
    throw new AppError('Category name already exists.', 400);
  }

  const category = new Category({ name: name.trim() });
  const savedCategory = await category.save();

  res.status(201).json({
    success: true,
    message: 'Category created successfully.',
    data: savedCategory,
  });
});

export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid category ID format.', 400);
  }

  const category = await Category.findById(id);
  if (!category) {
    throw new AppError('Category not found.', 404);
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid category ID format.', 400);
  }

  if (typeof name !== 'string' || !name.trim() || name.trim().length < 3) {
    throw new AppError('Category name must be a string with at least 3 characters.', 400);
  }

  const category = await Category.findById(id);
  if (!category) {
    throw new AppError('Category not found.', 404);
  }

  category.name = name.trim();
  const updatedCategory = await category.save();

  res.status(200).json({
    success: true,
    message: 'Category updated successfully (PUT).',
    data: updatedCategory,
  });
});

export const patchCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid category ID format.', 400);
  }

  const category = await Category.findById(id);
  if (!category) {
    throw new AppError('Category not found.', 404);
  }

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim() || name.trim().length < 3) {
      throw new AppError('Category name must be a string with at least 3 characters.', 400);
    }
    category.name = name.trim();
  }

  const updatedCategory = await category.save();

  res.status(200).json({
    success: true,
    message: 'Category updated successfully (PATCH).',
    data: updatedCategory,
  });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid category ID format.', 400);
  }

  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new AppError('Category not found.', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully.',
    data: category,
  });
});




