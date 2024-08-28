import express from 'express';
import { transferProductToInventory ,  getAllProducts  , deleteinventoryProduct, getInventoryById, addInventoryProduct ,deleteInventoryProduct} from '../controllers/inventory.controller.js';

const router = express.Router();

// // GET request to fetch product details by productId
router.get('/:productId', transferProductToInventory);

// POST request to transfer a product to inventory
router.post('/:productId', transferProductToInventory);

// Route for getting all products
router.get('/', getAllProducts );

// Route for deleting a product by productId
router.delete('/:id',deleteinventoryProduct);

router.get('/okk/:productId', getInventoryById);
router.put('/:productId/quantity', addInventoryProduct);
router.put('/:productId/quantityy', deleteInventoryProduct);

export default router;