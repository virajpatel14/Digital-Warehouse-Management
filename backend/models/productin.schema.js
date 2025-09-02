import mongoose from 'mongoose';

const productInSchema = new mongoose.Schema({
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
    },
    dateOfEntry: {
        type: Date,
        default: Date.now
    }
});

const ProductIn = mongoose.model('ProductIn', productInSchema);
export default ProductIn;
