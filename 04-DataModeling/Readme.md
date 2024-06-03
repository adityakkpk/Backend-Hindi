# Data modelling for backend with mongoose

## Data Modeling
- Firstly, what `data is need to be stored in the database`. What are the `data points` are like username, email, password etc. First, get the `clearity about data` to be storded.
- When you create a project, you have to be cleared about, how youe application look like, how data will be stored and how the data are related to each other.

## Tools
* **Mongoose**
* **Moon Modeler**
* **Eraser.io**
* **Codesendbox**
* **Github Codespace**
* **Stack Blitz**

## Creating a Data Model / Object Model
* **Visualize**
    - First, create a `Model`. (Register)
    - Then `specify required data points`. (username, email,password, photo, DOB etc.)

* **Code** 
    - Create a `Model` folder.
    - Inside Model folder, define your model and charecters.
    - For creating characters use `character.models.js` like naming convention.
    - Create Mongooes model for charecters:
        ```javascript
            import mongoose from 'mongoose';

            const userSchema = new mongoose.Schema({});

            export const User = mongoose.model('User', userSchema);
        ```
        Here we create a `User` model. But it will store like `users` in the `mongoDB` database.
    - Create Schema:
        ```javascript
            const userSchema = new mongoose.Schema({
                username: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                }
            });
        ```