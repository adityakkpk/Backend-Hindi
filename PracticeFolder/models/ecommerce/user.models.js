import mongoose from 'mongoose';

const userSchemea = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024
    }
}, {timeStamps: true});

export const User = mongoose.model('User', userSchemea);