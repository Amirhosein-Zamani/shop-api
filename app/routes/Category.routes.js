import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  patchCategory,
  deleteCategory
} from '../controllers/Category.controller.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(createCategory);

router.route('/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .patch(patchCategory)
  .delete(deleteCategory);

export const categoryRoutes = router;
