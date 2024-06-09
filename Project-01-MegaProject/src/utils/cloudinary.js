import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if(!filePath) return null;
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        });
        // File is successfully uploaded
        console.log("File upload Success: ", uploadResult.url);
        return uploadResult;

    } catch (error) {
        fs.unlink(filePath); // Delete the locally saved temporary file as the upload operation failed
        return null;
    }
}

export {uploadOnCloudinary};