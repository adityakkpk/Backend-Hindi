# Access Refresh Token, Middleware and cookies in Backend
## *What is Access Token and Referesh Token?*
- When we register a new user, we give them both a refresh token and a access token. When user login, we validate the user with access token and give him the access for a particular session. So as soon as the session is expired, user have to login again. So here comes the refresh token into the picture. Referesh token allows user to continue to the same session by just hitting the same endpoint. As user hit the endpoint we check that the refresh token given by the user and the refresh token in our database is same or not. If refresh token is same then continue with the current session.
- Access token is short lived and the refresh token is long lived.

## *Creating Login User Controller.*
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

## *Creating a auth middleware for user logout*
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

## *Creating Logout User Controller.*
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

## *Create routes for login and logout*
- Got to the routes folder and inside user.routes.js file add the below routes:
```javascript
router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
```