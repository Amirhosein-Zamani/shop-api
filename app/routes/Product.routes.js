import express from 'express';
import {
    getProducts,
    getProductsByCategory,
    createProduct,
    deleteProduct,
} from '../controllers/Product.controller.js';

 const router = express.Router();

router.route('/')
 .get(getProducts)
 .post(createProduct);

router.route('/:id')
 .delete(deleteProduct);

router.route('/category/:categoryId')
  .get(getProductsByCategory);

export const productRoutes = router;

