// models/productOut.schema.js
import mongoose from 'mongoose';

const productOutSchema = new mongoose.Schema({
    
    productId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    },
    quantity: {
        type: Number,
        required: true
    }
});

const ProductOut = mongoose.model('ProductOut', productOutSchema);
export default ProductOut;
