import express from 'express';
import {
    createCategory,
} from '../controllers/Category.controller.js';

const router = express.Router();

router
  .route('/')
  .post(createCategory);

export const categoryRoutes = router;