## Complete guide for router and controller with debugging
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