# Mega Project: Youtube-Tweeter-Backend

## Steps which I follow to create this project:

### **Step 1: Setup the Project**
- Create a new project folder and initialize node environment by using the following command : `npm init` or `npm init -y`.

- Initialize `git` repository and push it to the remote repository.

- Make a Folder `Public` for our images and other stuff. As we know that git does not track empty folders so we will add `.gitkeep` file inside `Public` folder.

- Add `.gitignore` file and use gitignore generators to generate the .gitignore file.

- Create a file `.env`. And also create a `.env.sample` file for the `.env` reference.

- Create `src` folder where we will keep our all the source code files. And create some files like `app.js`, `constants.js` and `index.js`.

- Update the `package.json` file to use modules and add some `scripts` for the production.

- Install `nodemon` packege as a development dependency by using `npm i nodemon` command.

- Add, commit and push the changes to the remote repository.

- Now create some folders inside the `src` folder: 
    - `controllers` : All the functionalities put inside this 
    - `db` : Code for connecting to the database
    - `middlewares` : All the codes for some checking before `request` reching to the server.
    - `models` : for our data points
    - `routes` : code for all routes
    - `utils` : code for utilities like file upload, mailing etc 

- Install `Prettier` for the format of the code that what structure we will use for this project.
    - Install it using `npm  i -D prettier`.
    - Add some file for the formating of the code file
    - add `.prittierrc` file for the code formatting and `.prittierignore` file to ignore by the prittier.

### **Step 2: Connecting to Database and Debugging**
- `Database is always in another continent`
    - It means that when we use database, it will take time so always use `async-await`.

- Best practices
    - When we connect to dataabases, there is a chance that some `error` can be occured. So always try to wrap it into `try-catch` block or use `Promises`.

    - Use `;` before IFFEs.

- Connect to database
- Go to google and search `MongoDb Atlas`.
- We will go with the Free Shared Database.
- Create a new project.
- Create Cluster and setup `Username and Password`.
- Setup IP address.
- Now open the code editor and create some variable for connecting the database inside `.env` file.
- Now go to `src` directory and inside `constants` file create a `DB_NAME` variable and export it.
- Now install some packages : `npm i mongoose express dotenv`
- Now we will see two code `approaches` to connect to the database
    - `First` is to write the database connection code inside `index.js` file
        ```javascript
        import express from 'express';
        const app = express();
        ;( async () => {
            try {
                await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

                app.on('error', (error) => {
                    console.log("Error: ", error);
                })

                app.listen(process.env.PORT, () => {
                    console.log(`App is listening on port ${process.env.PORT}`);
                });

            } catch (error) {
                console.error("Error: " , error);
                throw error;
            }
        } )()
        ```
    - Second approach is to write the database connection code in the `separate file` in `DB` folder and import it into the index.js file.
        ```javascript
        import mongoose from "mongoose";
        import { DB_NAME } from "../constants";

        const connectDB = async () => {
            try {
                const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
                console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
            } catch (error) {
                console.error("MongoDB connecction error " , error);
                process.exit(1);
            }
        }

        export default connectDB;
        ```

- Now to import `dotenv` package we generall use the following syntax: `require('dotenv').congif({path: "./env"})`. There is no problem in this. but it does not maintaines the code consistancy. So for maintaining the code consistency we will make some changes :
    - In index.js:  `import dotenv from "dotenv";`
    - In package.json file: 
    ```javascript
    "scripts": {
        "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
    },
    ```
- At last `run` the code and `Debug` the error if any

### **Step 3: Custom api response and error handling**
- Inside `src` folder, in `App.js` Create a Express Application.
    - Import the `express` package and create a `app` from it.
    - Install `cookie-parser` and `cors` package.
    - Configure them 
        ```javascript
        - For CORS
        app.use(cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        }));
        - For json data
        app.use(express.json({limit: "16kb"}));
        - For URL data
        app.use(express.urlencoded({extended: true, limit: "16kb"}));
        - For images or files
        app.use(express.static("public"));
        - For Cookies
        app.use(cookieParser());
        ```
    - **Middleware**: Middewares are the `checks` that are performed on the request `before` the request reached to the `server`.
    - Now create some utilities like `ApiError`, `ApiResponse` and `asyncHandler` in the utils folder.

### **Step 4: User and video model with hooks and JWT**
- Create some `models` like `user model`, `video model` etc inside the `model folder`.
- Install `mongoose-aggregate-paginate-v2` package for writting complex querries in our project.
- Install `JWT` using `npm i jsonwebtoken` command for creating tokens.
    - JWT is a `bearer` token. It means, if you have this tocken, it will send the data to you.  
- Install `bcrypt` package for hasing the passwords.
- Write code for hashing the password and comparing them:
    ```javascript
    - pre() :- it is a middleware which execute before the data is saved into the database
    userSchema.pre("save", async function (next) {
        if(!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password, 10);
        next();
    });

    userSchema.methods.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password);
    }
    ```
- Write the code to generate tokens:
    ```javascript
    userSchema.methods.generateAccessToken = function (){
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username,
                fullName: this.fullName,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }
    userSchema.methods.generateRefreshToken = function (){
        return jwt.sign(
            {
                _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }
    ```
    
### **Step 5: How to upload file in backend | Multer**
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

    - Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET
    });

    const uploadOnCloudinary = async (filePath) => {
        try {
            if(!filePath) return null;
            - Upload an image
            const uploadResult = await cloudinary.uploader.upload(filePath, {
                resource_type: "auto",
            });
            - File is successfully uploaded
            console.log("File upload Success: ", uploadResult.url);
            return uploadResult;

        } catch (error) {
            fs.unlink(filePath); - Delete the locally saved temporary file as the upload operation failed
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

- `Project configuration Done`
---

### **Step 5 : Router and Controller with Debugging**
- Creating a `Controller` for `user registration`
    - For Example: `
    ```javascript
    import {asyncHandler} from '../utils/asyncHandler.js';

    const registerUser = asyncHandler( async (req, res) => {
        res.status(200).json({
            message: "ok"
        });
    } )

    export {registerUser,} 
    ```
- Creating a `Routers` for `user registration`
    - For Example:
    ```javascript
    import { Router } from "express";
    import { registerUser } from "../controllers/user.controller.js";

    const router = Router();

    router.route("/register").post(registerUser);

    export default router;       
    ```
- Importing `Router` in `app.js` and `declaring` them.
- At last `Debugging` the code.

### **Step 6 : Logic Building | Register Controller**
- *Creating `Register Controller` for our application* :
    - get user details from frontend
    - validation - not empty
    - check if user already exists: username, email
    - check for images, check for avatar
    - upload them to Cloudinary server, avatar
    - create user object - create entry in db
    - remove password and referesh token from response
    - check for user creation 
    - return response

- *Writing Code for Register Controller:*
    - In `user.controller.js` destructure the data coming from frontend.
    - For file handling, in `user.routes.js` file import `upload` from `multer.middleware.js`. And the write code for uploading file.
    ```javascript
    router.route("/register").post(
        upload.fields([
            {
                name: "avatar",
                maxCount: 1,
            },
            {
                name: "coverImage",
                maxCount: 1,
            }
        ]),
        registerUser
    );
    ```
    - *code*:
    ```javascript
        import {asyncHandler} from '../utils/asyncHandler.js';
        import {ApiError} from "../utils/ApiError.js"
        import {User} from "../models/user.model.js"
        import {uploadOnCloudinary} from "../utils/cloudinary.js"
        import { ApiResponse } from '../utils/ApiResponse.js';

        const registerUser = asyncHandler( async (req, res) => {
            // get user details from frontend
            // validation - not empty
            // check if user already exists: username, email
            // check for images, check for avatar
            // upload them to Cloudinary server, avatar
            // create user object - create entry in db
            // remove password and referesh token from response
            // check for user creation 
            // return response

            // get user details from frontend
            const {fullName, email, username, password} = req.body
            console.log("Email: " + email);

            // Validation
            if (
                [fullName, email, username, password].some((field) => field?.trim() === "")
            ) {
                throw new ApiError(400, "All fields are required")
            }

            // User exists or not 
            const existedUser = User.findOne({ 
                $or: [{username}, {email}]
            })
            if (existedUser) {
                throw new ApiError(409, "User already exists")
            }

            // Check for images, chack for avatar
            const avatarLocalpath = req.files?.avatar[0]?.path;
            const coverimageLocalPath = req.files?.coverimage[0]?.path;
            console.log(req.files);
            if(!avatarLocalpath) {
                throw new ApiError(400, "Avatar file is Required.");
            }

            // Upload image to Cloudinary server
            const avatar = await uploadOnCloudinary(avatarLocalpath);
            const coverImage = await uploadOnCloudinary(coverimageLocalPath);
            if(!avatar) {
                throw new ApiError(400, "Avatar file is Required");
            }

            // Create entry in DB
            const user = await User.create({
                fullName,
                email,
                username: username.toLowerCase(),
                password,
                avatar: avatar.url,
                coverImage: coverImage?.url || "",
            })

            // Check user is created or not
            const createdUser = user.findById(user.id).select(
                "-password -refreshToken"
            );
            if(!createdUser) {
                throw new ApiError(500, "Something went wrong while registering the user");
            }

            //return responce
            return res.status(201).json(
                new ApiResponse(200, createdUser, "User Register Successfully.")
            )
        } )

        export {
            registerUser,
        }
    ```
- Using `Postman` for testing purposes
    - Testing `POST` requests for `register user` with dummy data.

### **Step 7: How to use postman for Backend**
- When you work with real world project or as a Backend Engineer, you need to share some `collection` to the Frontend Engineer. To create this collection we will use `Postman`.
- Open postman and create a `post` request for the `register user` endpoint for testing.
- Send form-data to the `register user` endpoint by using postman.
- Fixed all the Errors.
- Now in postman Create a new `Collection` and create a new `variable` for this collection and setup the `register endpoint` for `post request`.

### **Step 8: Access Refresh Token, Middleware and cookies in Backend**
* *What is Access Token and Referesh Token?*
    - When we register a new user, we give them both a refresh token and a access token. When user login, we validate the user with access token and give him the access for a particular session. So as soon as the session is expired, user have to login again. So here comes the refresh token into the picture. Referesh token allows user to continue to the same session by just hitting the same endpoint. As user hit the endpoint we check that the refresh token given by the user and the refresh token in our database is same or not. If refresh token is same then continue with the current session.
    - Access token is short lived and the refresh token is long lived.

* *Creating Login User Controller.*
    - Go to the `user.controller.js` file and create a new `login user`.
    ```javascript
    const loginUser = asyncHandler(async (req, res) => {
        // req body -> data
        // username or email login
        // find the user
        // password check
        // access token and refresh token
        // send cookies

        const {email, username, password} = req.body;

        if (!username || !email) {
            throw new ApiError(400, "username or email required");
        }

        const user = await User.findOne({
            $or: [{username}, {email}]
        })

        if(!user) {
            throw new ApiError(404, "User not found");
        }

        const ispasswordValid = await user.isPasswordCorrect(password);

        if(!ispasswordValid) {
            throw new ApiError(401, "Invalid Password");
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

        const loggedInUser = User.findById(user._id).select(
            "-password -refreshToken"
        );

        const options = {
            httpOnly: true,
            secure: true,
        }

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken,
                },
                "User logged in successfully"
            )
        )

    });
    ```

* *Creating a auth middleware for user logout*
    - Go to the `middleware` folder and create a new file `auth.middleware.js` and write the below code.
    ```javascript
    import { User } from "../models/user.model";
    import { ApiError } from "../utils/ApiError";
    import { asyncHandler } from "../utils/asyncHandler";
    import jwt from 'jsonwebtoken';

    export const verifyJWT = asyncHandler( async (req, res, next) => {
        try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
            if(!token) {
                throw new ApiError(401, "Unauthorized request");
            }
        
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
            const user = await User.findById(decodedToken?._id).select(
                "-password -refreshToken"
            );
        
            if(!user) {
                throw new ApiError(401, "Invalid AccessToken");
            }
        
            req.user = user;
            next();

        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid AccessToken");
        }
    })
    ```

* *Creating Logout User Controller.*
    - Go to the `user.controller.js` file and create method `logoutUser`.
    ```javascript
    const logoutUser = asyncHandler(async (req, res) => {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined,
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true,
        }

        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out"))
    });
    ```

* *Create routes for login and logout*
    - Got to the routes folder and inside user.routes.js file add the below routes:
    ```javascript
    router.route("/login").post(loginUser);

    // Secured routes
    router.route("/logout").post(verifyJWT, logoutUser);
    ```

### **Step 9 - Access Token and Refresh Token in Backend**

* *Fixed Some Logical Error* 
- Fixed the logical error in the `user.controller.js` file.

* *Create Endpoints in POSTMAT*
- Create a new endpoint for the user `Login`
- Create a new endpoint for the user `Logout`

* *Discussion abot Access Token and Refresh Token*
- The `major` work of both token is to, user does not have to give the `email` and `password` again and again.
- Access tokens are `short-lived` whereas refresh tokens are `long-lived`.
- Refresh tokens are placed inside the database. Becuse as the access token expiries, the frontend developer hit the new endpoint with the refresh token and we generate new access tokens for the user so that, user does not have to signup again.

* *Creating a new endpoint for the frontend engineer*

### **Step 10 - Writting update controllers for user**

* *Creating a new Subscription Model*
    - Create a new file `subscription.mode.js` inside the `models` directory and write the code for the subscription model: 
    ```javascript
    import mongoose, {Schema } from 'mongoose';

    const subscriptionSchema = new Schema({
        subscriber: {
            type: Schema.Types.ObjectId, // one who is subscribing
            ref: 'User',
        }, 
        channel: {
            type: Schema.Types.ObjectId, // one to whom 'subscriber' is subscribing
            ref: 'User',
        }
    }, {timeseries: true});

    export const Subscription = mongoose.model('Subscription', subscriptionSchema);
    ```

* *Creating Controllers for updation in User data*
    ```javascript
    const changeCurrentPassword = asyncHandler(async (req, res) => {
        const { oldPassword, newPassword } = req.body;

        const user = await User.finfById(req.user?._id);
        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

        if (!isPasswordCorrect) throw new ApiError(400, "Invalid password");

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Password Changed Successfully"));
    });

    const getCurrentUser = asyncHandler(async (req, res) => {
        return res
            .status(200)
            .json(200, req.user, "Current User Fetched Successfully");
    });

    const updateAccountDetails = asyncHandler(async (req, res) => {
        const {fullName, email} = req.body;

        if(!fullName || !email) throw new ApiError(400, "All fields are required.") 

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    fullName,
                    email
                }
            },
            {new: true}
        ).select("-password");

        return res
        .status(200)
        .json(new ApiResponse(200, user, "Account Details Updated Successfully"));
    });

    const updateUserAvatar = asyncHandler(async (req, res) => {
        const avatarLocalPath = req.file?.path;

        if(!avatarLocalPath) throw new ApiError(400, "Avatar file is missing");

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        if(!avatar.url) throw new ApiError(400, "Error while uploading avatar");

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    avatar: avatar.url
                }
            },
            {new: true}
        ).select("-password");

        return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar Updated Successfully"));
    });

    const updateUserCoverImage = asyncHandler(async (req, res) => {
        const coverLocalPath = req.file?.path;

        if(!coverLocalPath) throw new ApiError(400, "Cover file is missing");

        const coverImage = await uploadOnCloudinary(coverLocalPath)
        if(!coverImage.url) throw new ApiError(400, "Error while uploading coverImage");

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    coverImage: coverImage.url
                }
            },
            {new: true}
        ).select("-password");

        return res
        .status(200)
        .json(new ApiResponse(200, user, "Cover Image Updated Successfully"));
    });

    ```

### **Step 11 - MongoDB Aggrgations Pipeline**
- *Creating a pipeline for user subscription.*
    - Inside the user.controllers.js file, add the below function for the pipeline:
    ```javascript
    const getUserChannelProfile = asyncHandler(async (req, res) => {
        const {username} = req.params;
        if(!username.trim()) throw new ApiError(400, "Username missing");

        const channel = await User.aggregate([
            // Find the User by username
            {
                $match: {
                    username: username?.toLowerCase()
                }
            },
            // Get the subscribers of the user's channel
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },
            // Get the channels which user has subscribed to
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscribedTo"
                }
            },
            // Now counting the number of subscribers and channels user has subscribed and checked for subscriptions
            {
                $addFields: {
                    subscribersCount: {
                        $size: "$subscribers"
                    },
                    channelSubscribedToCount: {
                        $size: "$subscribedTo"
                    },
                    isSubscribed: {
                        $cond: {
                            if: {$in: [req.user?._id, "subscribers.subscriber"]},
                            then: true,
                            else: false
                        }
                    }
                }
            },
            // Returning the selected items
            {
                $project: {
                    fullName: 1,
                    username: 1,
                    subscribersCount: 1,
                    channelSubscribedToCount: 1,
                    isSubscribed: 1,
                    avatar: 1,
                    email: 1,
                    coverImage: 1,
                }
            }
        ])

        if(!channel?.length) throw new ApiError(404, "Channel does not exists")

        return res
            .status(200)
            .json(new ApiResponse(200, channel[0], "User Channel Profile Fetched Successfully"));
    });
    ```

### **Step 12 - Sub pipelines and routes**
* *Creating a pipeline for watch-history.*
    - In this pipelining process firstly, we will `select user`.
    - Then we will fetch `watchHistory` 
    - Then we will find the `owner` of the watchHistory.
    - Then we converted the returned array into a single element.
    - Inside the `user.controller.js` file: 
    ```javascript
    const getWatchHistory = asyncHandler(async (req, res) => {
        const user = await User.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.user?._id)
                }
            }, 
            {
                $lookup: {
                    from: "videos",
                    localField: "watchHistory",
                    foreignField: "_id",
                    as: "watchHistory",
                    // Sub-pipeline
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "owner",
                                foreignField: "_id",
                                as: "owner",
                                pipeline: [
                                    {
                                        $project: {
                                            fullName: 1,
                                            username: 1,
                                            avatar: 1,
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $addFields: {
                                owner: {
                                    // $arrayElemAt: ["$owner", 0]
                                    $first: "$owner"
                                }
                            }
                        }
                    ]
                }
            },
        ]);

        return res
            .status(200)
            .json(new ApiResponse(200, user[0].watchHistory, "Watch History fetched successfully"));
    });
    ```

### **Step 13 - Add some new routes for user controller**
- ```javascript
    router.route("/change-password").post(verifyJWT, changeCurrentPassword);
    router.route("/current-user").get(verifyJWT, getCurrentUser);
    router.route("/update-account").patch(verifyJWT, updateAccountDetails);

    router
        .route("/avatar")
        .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
    router
        .route("/cover-image")
        .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

    router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
    router.route("/history").get(verifyJWT, getWatchHistory);
  ```

### **Step 14 - MongoDB models for like playlist and tweet**
* *Testing All the Routes by using POSTMAN*
    - Creating the `routes` for `testing` in POSTMAN.
    - Fixed all the `errors` occured while `Testing`.

* *Creating some more models*
    - Create a new comment model.
    - Create a new like model.
    - Create a new playlist model.
    - Create a new tweet model.