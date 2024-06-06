# Mega Project: Youtube-Tweeter-Backend

## Steps which I follow to create this project:

* **Step 1: Setup the Project**
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

* **Connecting to Database and Debugging**
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

* **Custom api response and error handling**
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