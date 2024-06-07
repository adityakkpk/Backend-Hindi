# How to upload file in backend | Multer
- File uploading is done by the `Backend Engineers`.

- File uploads are not done on our servers. It is done on the t`hired party services` or `AWS`.

- We will use `Cloudinary` to upload images.
    - Inside `utils` folder create a file and code.
    - Install Cloudinary: `npm i cloudinary`
    - Import Cloudinary 
    - Configure the API keys and username.
    - And upload the file.
    ```javascript
    import {v2 as cloudinary} from 'cloudinary';
    import fs from "fs";

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET
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
    ```

- We will use `Multer` package for uploading files.
    - Inside `middlewares` folder create a file to write multer middleware code.
    - Install Multer: `npm i multer`
    ```javascript
    import multer from "multer";

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/temp");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });

    export const upload = multer({ storage: storage });
    ```
    
    