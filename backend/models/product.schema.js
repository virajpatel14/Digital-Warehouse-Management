import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,"Please provide product name"],
            trim: true,
            maxLength: [120, "Product name not should be more than 120 character"],
        },
        price: {
            type: Number,
            required: [true, "Please provide a product price"],
            maxLength: [5, "Please enter valid price"]
        },
        description: {
            type: String,
            
        },
        quantity:{
            type:Number,
            default: 0
        },
       
        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        },
        productId: {
            type: Number,
            required: true,
            unique: true, // Ensure uniqueness for productId
        },
       
    
    },
    {
        timestamps: true
    }

);

export default mongoose.model("Product", productSchema)