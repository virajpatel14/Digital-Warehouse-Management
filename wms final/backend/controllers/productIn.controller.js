// controllers/productInController.js
import ProductIn from '../models/productin.schema.js';
import Inventory from '../models/inventory.schema.js';
import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../utils/customError.js';

// @desc    Add product to inventory and log it as product in
// @route   POST /api/productIn
// @access  Public (or specific access level)
export const addProductToInventory = asyncHandler(async (req, res) => {
    const { productId, name, price, description, quantity } = req.body;

    try {
        // Check if the product already exists in the inventory
        const existingProduct = await Inventory.findOne({ productId });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product already exists in inventory' });
        }

        // Create a product in entry
        const productIn = new ProductIn({
            productId,
            name,
            price,
            description,
            quantity
        });

        // Save the product in entry to the database
        await productIn.save();

        // Add the product to the inventory collection
        const inventoryItem = new Inventory({
            productId,
            name,
            price,
            description,
            quantity
        });

        await inventoryItem.save();

        return res.status(200).json({ message: 'Product added to inventory and logged as product in' });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Get all added products (product in)
// @route   GET /api/productIn
// @access  Public (or specific access level)
export const getAllAddedProducts = asyncHandler(async (req, res) => {
    try {
        const addedProducts = await ProductIn.find();
        if (!addedProducts || addedProducts.length === 0) {
            return res.status(404).json({ message: 'No added products found' });
        }

        return res.status(200).json(addedProducts);
    } catch (error) {
        console.error('Error fetching added products:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
