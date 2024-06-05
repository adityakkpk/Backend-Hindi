# How to connect database in MERN with debugging

## `Database is always in another continent`
    - It means that when we use database, it will take time so always use `async-await`.

## Best practices
- When we connect to dataabases, there is a chance that some `error` can be occured. So always try to wrap it into `try-catch` block or use `Promises`.

- Use `;` before IFFEs.

## Connect to database
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