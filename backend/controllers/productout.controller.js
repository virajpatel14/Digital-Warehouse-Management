// controllers/productOutController.js
import ProductOut from '../models/productout.schema.js';
import Inventory from '../models/inventory.schema.js';
import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../utils/customError.js';

// @desc    Remove product from inventory and log it as product out
// @route   POST /api/productOut/:productId
// @access  Public (or specific access level)
export const removeProductFromInventory = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    try {
        // Find the product in the Inventory collection
        const inventoryItem = await Inventory.findOne({ productId });
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Product not found in inventory' });
        }

        // Create a product out entry based on the inventory item details
        const productOut = new ProductOut({
            productId: inventoryItem.productId,
            name: inventoryItem.name,
            price: inventoryItem.price,
            description: inventoryItem.description,
            quantity: inventoryItem.quantity
        });

        // Save the product out entry to the database
        await productOut.save();

        // Remove the original product from the inventory collection
        await Inventory.findByIdAndDelete(inventoryItem._id);

        return res.status(200).json({ message: 'Product removed from inventory and logged as product out' });
    } catch (error) {
        console.error('Error removing product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Get all removed products (product out)
// @route   GET /api/productOut
// @access  Public (or specific access level)
export const getAllRemovedProducts = asyncHandler(async (req, res) => {
    try {
        const removedProducts = await ProductOut.find();
        if (!removedProducts || removedProducts.length === 0) {
            return res.status(404).json({ message: 'No removed products found' });
        }

        return res.status(200).json(removedProducts);
    } catch (error) {
        console.error('Error fetching removed products:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
