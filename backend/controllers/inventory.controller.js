import Product from '../models/product.schema.js';
import Inventory from '../models/inventory.schema.js';
import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../utils/customError.js';
import ProductOut from '../models/productout.schema.js';
import productin from '../models/productin.schema.js';
// @desc    Transfer product to inventory
// @route   POST /api/transfer/:productId
// @access  Public (or specific access level)
export const transferProductToInventory = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    console.log(`Received productId: ${productId}`);

   

    try {
        // Find the product by productId in Product collection
        const product = await Product.findOne({ productId});
        console.log(`Product found: ${product}`);

        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the product already exists in Inventory collection
        const existingInventoryItem = await Inventory.findOne({ productId });
        console.log(`Existing inventory item: ${existingInventoryItem}`);

        if (existingInventoryItem) {
            return res.status(400).json({ message: 'Product already exists in inventory' });
        }

        // Create an inventory item based on the product details
        const inventoryItem = new Inventory({
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            collectionId: product.collectionId,
            productId: product.productId,
        });

        // Save the inventory item to the database
        await inventoryItem.save();
        console.log(`Inventory item saved: ${inventoryItem}`);

        // Optionally, remove the original product from the product collection
        // await Product.findOneAndDelete({ productId: parsedProductId });

        return res.status(200).json({ message: 'Product transferred to inventory' });
    } catch (error) {
        console.error('Error transferring product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Get all products
// @route   GET /api/product
// @access  Public (or specific access level)
export const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Inventory.find();
        console.log(`Products found: ${products}`);

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Delete product by productId
// @route   DELETE /api/product/:productId
// @access  Public (or specific access level)
export const deleteinventoryProduct = asyncHandler(async (req, res) => {
    const { id  } = req.params
    const deletedinventoryProduct = await Inventory.findByIdAndDelete(id)
    console.log(deletedinventoryProduct)

    if (!deletedinventoryProduct) {
        throw new CustomError("Product not found", 400)
    }
    const outitem = new ProductOut({
        // _id: deletedinventoryProduct._id,
        name: deletedinventoryProduct.name,
        price: deletedinventoryProduct.price,
        description: deletedinventoryProduct.description,
        quantity: deletedinventoryProduct.quantity,
        collectionId: deletedinventoryProduct.collectionId,
        productId: deletedinventoryProduct.productId,
    });

    // Save the inventory item to the database
    await outitem.save();
    console.log(`Inventory item saved: ${outitem}`);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        deletedinventoryProduct,
    })

})
// get productbyid
export const getInventoryById = asyncHandler(async (req, res) => {
    const { productId:id } = req.params;
  
    try {
      const inventoryData = await Inventory.findOne({ productId:id}); // Ensure productId is parsed to integer if necessary
  
      if (!inventoryData) {
        return res.status(404).json({
          success: false,
          message: `Product with productId  not found`,
        });
      }
  
      res.status(200).json({
        success: true,
        inventoryData,
      });
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  })


// ADD PRODUCT IN ITEMS IN
export const addInventoryProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const { quantity } = req.body;

    // Validate quantity
    if (!quantity || isNaN(quantity)) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    try {
        // Use await to get the product from the database
        let product = await Inventory.findOne({ productId: productId });

        if (product) {
            // Create a response object with the data before updating quantity
            const response = {
                productId: product.productId,
                name: product.name,
                price: product.price,
                description: product.description,
                collectionId: product.collectionId,
                quantity: Number(quantity) // Show the quantity added
            };

            // Create a new ProductIn document
            const inItem = await productin.create(response);

            // Update the quantity in the existing product
            product.quantity += Number(quantity); // Ensure quantity is a number
            await product.save();

            // Return the ProductIn document created
            res.json(inItem);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// @desc    Delete quantity from inventory and log it as product out
// @route   DELETE /api/inventory/:productId
// @access  Public (or specific access level)
export const deleteInventoryProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const { quantity } = req.body;

    // Validate quantity
    if (!quantity || isNaN(quantity)) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    try {
        // Use await to get the product from the database
        const product = await Inventory.findOne({ productId });

        if (product) {
            if (product.quantity - quantity >= 0) {
                // Calculate the quantity to be removed
                const deletedQuantity = Number(quantity); // Ensure quantity is a number
                product.quantity -= deletedQuantity;

                // Save the updated product
                await product.save();

                // Construct the response object in the desired format
                const response = {
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    quantity: deletedQuantity,
                    collectionId: product.collectionId,
                    productId: product.productId,
                };

                // Create a new ProductOut document
                const outItem = await ProductOut.create(response);

                // Return the response
                return res.json(outItem);
            } else {
                return res.status(400).json({ message: "Entered quantity exceeds available quantity" });
            }
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});
