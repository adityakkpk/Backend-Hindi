import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
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
    const { fullName, email, username, password } = req.body;

    // Validation
    if (
        [fullName, email, username, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // User exists or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // Check for images, chack for avatar
    // const avatarLocalpath = req.files?.avatar[0]?.path;
    let avatarLocalpath;
    if (
        req.files &&
        Array.isArray(req.files.avatar) &&
        req.files.avatar.length > 0
    ) {
        avatarLocalpath = req.files.avatar[0].path;
    }
    if (!avatarLocalpath) {
        throw new ApiError(400, "Avatar file is Required.");
    }
    // const coverimageLocalPath = req.files?.coverImage[0]?.path;
    let coverimageLocalPath;
    if (
        req.files &&
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage.length > 0
    ) {
        coverimageLocalPath = req.files.coverImage[0].path;
    }

    // Upload image to Cloudinary server
    const avatar = await uploadOnCloudinary(avatarLocalpath);
    const coverImage = await uploadOnCloudinary(coverimageLocalPath);
    if (!avatar) {
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
    });

    // Check user is created or not
    const createdUser = await User.findById(user.id).select(
        "-password -refreshToken"
    );
    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }

    //return responce
    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User Register Successfully."));
});

export { registerUser };
