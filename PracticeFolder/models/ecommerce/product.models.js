import mongoose from  'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    numReviews: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

export const Product = mongoose.model('Product', productSchema);