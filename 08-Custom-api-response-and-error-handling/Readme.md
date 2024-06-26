# Custom api response and error handling
- Inside `src` folder, in `App.js` Create a Express Application.
    - Import the `express` package and create a `app` from it.
    - Install `cookie-parser` and `cors` package.
    - Configure them 
        ```javascript
        // For CORS
        app.use(cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        }));
        // For json data
        app.use(express.json({limit: "16kb"}));
        // For URL data
        app.use(express.urlencoded({extended: true, limit: "16kb"}));
        // For images or files
        app.use(express.static("public"));
        // For Cookies
        app.use(cookieParser());
        ```
    - **Middleware**: Middewares are the `checks` that are performed on the request `before` the request reached to the `server`.
    - Now create some utilities like `ApiError`, `ApiResponse` and `asyncHandler` in the utils folder.
