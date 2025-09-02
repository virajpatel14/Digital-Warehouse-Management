import Product from "../models/product.schema.js"
import formidable from "formidable"
import Mongoose from "mongoose"
import asyncHandler from "../services/asyncHandler.js"
import CustomError from "../utils/customError.js"
import config from "../config/index.js"
import User from "../models/user.schema.js" 
import inventory from"../models/inventory.schema.js"

/******
 * @ADD_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller user for creating a new product
 * @description Only admin can create the coupon
 * @description Uses AWS S3 Bucket for image upload
 * @returns Product Object
 ******/

export const addProduct = asyncHandler(async (req, res) => {
    const form = formidable({
        multiples: true,
        keepExtensions: true
    });

    form.parse(req, async function (err, fields) {
        try {
            if (err) {
                throw new CustomError("Something went wrong", 500);
            }

            if (!fields.name || !fields.price || !fields.description || !fields.collectionId) {
                throw new CustomError("All details must be provided", 400);
            }
            


            const randomUid = () => Math.floor(10000000 + Math.random() * 90000000).toString(); // Convert to string

            // Convert fields to the appropriate types
            const productData = {
                name: String(fields.name),
                price: Number(fields.price),
                description: String(fields.description),
                collectionId: String(fields.collectionId),
                // quantity: Number(fields.quantity) ,
                productId: randomUid() // Call the function to get the random UID
            };

            const product = await inventory.create(productData);

            if (!product) {
                throw new CustomError("Product was not created", 400);
            }

            res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Something went wrong"
            });
        }
    });
});



/******
 * @GET_ALL_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for getting all products details
 * @description User and admin can get all the products
 * @returns Product Object
 ******/

export const getAllProducts = asyncHandler(async (req, res) => {
    const queryObj = { ...req.query }
    const products = await inventory.find(queryObj)

    if (!products) {
        throw new CustomError("Product was not found", 404)
    }
    res.status(200).json(products)
})

/******
 * @GET_PRODUCT_BY_ID
 * @route https://localhost:5000/api/product
 * @description Controller used for getting single product details
 * @description User and admin can get single product detail
 * @returns Product Object
 ******/

// product.controller.js

export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    try {
        const product = await inventory.findById(id);
        if (!product) {
            throw new CustomError("Product was not found", 404);
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
})




/******
 * @UPDATE_PRODUCT
 * @route https://localhost:5000/api/product/
 * @description Controller used for updating value of product
 * @description User and admin can update value of product
 * @returns Product Object
 ******/


// Update a product by productId
export const updateProduct = asyncHandler(async (req, res) => {
    const form = formidable({
        multiples: true,
        keepExtensions: true
    });

    form.parse(req, async function (err, fields) {
        try {
            if (err) {
                throw new CustomError("Something went wrong", 500);
            }

            const {id:productId} = req.params;

            console.log("Product ID:", productId); // Log productId to verify

            const product = await inventory.findByIdAndUpdate(productId);

            // const inventoryss = await inventory.findByIdAndUpdate(productId);
           

            console.log("Product found:", product); // Log product to verify

            if (!product) {
                throw new CustomError("Product not found", 404);
            }

            // Update product details
            product.name = String(fields.name) || product.name;
            product.price = Number(fields.price) || product.price;
            product.description = String(fields.description) || product.description;
            product.collectionId = String(fields.collectionId) || product.collectionId;
            product.quantity = Number(fields.quantity) || product.quantity;

            const updatedProduct = await product.save();

            res.status(200).json({
                success: true,
                product: updatedProduct, // Send updated product
                
            });
        } catch (error) {
            console.error("Error updating product:", error);
            return res.status(error.status || 500).json({
                success: false,
                message: error.message || "Something went wrong"
            });
        }
    });
});

/******
 * @DELETE_PRODUCT
 * @route https://localhost:5000/api/product/
 * @description Controller used for deleting product
 * @description Only admin can delete a product
 * @returns Product Object
 ******/

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const deletedProduct = await inventory.findByIdAndDelete(id)

    if (!deletedProduct) {
        throw new CustomError("Product not found", 400)
    }

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        deletedProduct,
    })

})

export const getProductoById = asyncHandler(async (req, res) => {
    const { id:productId} = req.params;
    
    try {
        const product = await inventory.findOne({productId}); // Use findOne with a query object

        if (!product) {
            throw new CustomError("Product was not found", 404);
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
});


