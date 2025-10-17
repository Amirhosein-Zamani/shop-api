import express from 'express';
import {
    getProducts,
    getProductsByCategory,
    createProduct,
    deleteProduct,
    updateProduct,
    patchProduct,
} from '../controllers/Product.controller.js';

 const router = express.Router();

router.route('/')
 .get(getProducts)
 .post(createProduct);

router.route('/:id')
 .put(updateProduct)
 .patch(patchProduct)
 .delete(deleteProduct);

router.route('/category/:categoryId')
  .get(getProductsByCategory);

export const productRoutes = router;

