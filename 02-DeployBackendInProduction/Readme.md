# How to deploy backend code in production

## Agenda 
- Create a server which handles our requests and responses.
- Creating a server using the Express.js.
- Handle the 'get' requests.

## Creating a server
- Create a node environment using command : `npm init` 0r `npm init -y`.
- Create a `index.js` file / `entry point` for the application.
- Add the `start` script to the packege.json file.
- Install Express.js using `npm install express` command.
- Then copy paste the starting code of express.js in index.js file.
    ```javascript
    const express = require('express');// import express

    const app = express(); // create a app instance with express
    const port = 3000; // a port number to listen on

    app.get('/', (req, res) => { // handle the 'get' request on '/' route
        res.send('Hello World!'); // send the response
    });

    app.listen(port, () => { // listen on port
        console.log(`Example app listening on port ${port}`);
    });
    ```
- At last run the `start` script.
- Now got to your browser and `open localhost` with the port you given.

- Now if we made any changes in our code then we have to `restart the server` to make sure all the changes will be reflected properly.

## Deployment
- When you deploy your application in production, we need to take care of some things spectially some `variables`, some sensitive info like `database username` and `password`, `login URL` etc.
- To deploy your application in production, we use a package called `.env`.
- Install the package using `npm install dotenv` command.
- Create a file with name `.env` and crate your environment variables like `PORT=8080` etc.
- To use the environmet variables we need to do some steps:
    1. require('dotenv').config()
    2. to use the env variable use `process.env.variable_name`.
- Now our application is ready for deployment in Production.

- Now upload your application to the GitHub repository.
