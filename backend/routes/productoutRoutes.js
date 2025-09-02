// routes/productOutRoutes.js
import express from 'express';
import {  getAllRemovedProducts , removeProductFromInventory} from '../controllers/productout.controller.js'
const router = express.Router();


// Route to get all removed products
router.get('/', getAllRemovedProducts);
router.delete('/:productId' ,removeProductFromInventory)
export default router;
