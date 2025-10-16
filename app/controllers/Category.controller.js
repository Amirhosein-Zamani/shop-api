import { Category } from '../models/Category.model.js';
import {AppError} from '../utils/AppError.util.js'
import { asyncHandler } from '../middleware/asyncHandler.middleware.js';

export const createCategory = asyncHandler(async(req, res, next) => {
  const { name } = req.body;
  if(!name || name.trim().length < 3) {
    throw new AppError('Category name must be at least 3 characters.', 400);
  }
  const category = new Category({ name });
  const savedCategory  = await category.save();
  res.status(201).json({ success: true, data: savedCategory });
});
