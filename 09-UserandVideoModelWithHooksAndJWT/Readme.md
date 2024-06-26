# User and video model with hooks and JWT
- Create some `models` like `user model`, `video model` etc inside the `model folder`.
- Install `mongoose-aggregate-paginate-v2` package for writting complex querries in our project.
- Install `JWT` using `npm i jsonwebtoken` command for creating tokens.
    - JWT is a `bearer` token. It means, if you have this tocken, it will send the data to you.  
- Install `bcrypt` package for hasing the passwords.
- Write code for hashing the password and comparing them:
    ```javascript
    // pre() :- it is a middleware which execute before the data is saved into the database
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