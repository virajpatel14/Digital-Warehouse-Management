// routes/productOutRoutes.js
import express from 'express';
import {  addProductToInventory , getAllAddedProducts} from '../controllers/productIn.controller.js'
const router = express.Router();


// Route to get all removed products
router.get('/', getAllAddedProducts);
router.post('/:productId' ,addProductToInventory)
export default router;
