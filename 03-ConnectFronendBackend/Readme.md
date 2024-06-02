# How to connect frontend and backend in javascript

## Backend
- Initialize the node instance using `npm init -y`.
- Install `express.js` and using `npm install express`.
- Create a new file called `server.js`.
- Add the `start` script in `package.json` file.
- Create a basic Express server with `'/' get` request.
- Update the `package.json` file and add `"type": "module"` in it.
- Now create a get request handler for `'/jokes'` request, which will show all the jokes.

## Frontend
- Create a vite react app using `bun create vite`.
- Install all dependencies and packages.
- Update `App.jsx` to show our jokes.
- Install a package `axios` by using `bun install axios`. We are using `axios` because we want to get data from the backend.
- Now fetch the data from the backend using axios. For example:
    ```javascript
    axios.get('https://localhost:3000/jokes')
    .then((response) => {
      setJokes(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    ```
- Now we will get a CORS error. The CORS error comes when the url is different, when the port numbers are different etc.

## Solution of CORS error
- `White list` the urls with port from Backend.
    - Install the `cors` package and use it.

- Standerize the request and use `Proxy`
    - Go to the `vite.config.js` file and add the server configuration. For example:
    ```javascript
    export default defineConfig({
    server: {
        proxy: {
        '/api' : 'http://localhost:3000'
        },
    },
    plugins: [react()],
    })
    ```
    Here when we hit any request with `/api` request it will append the url `http://localhost:3000` and it will restrict it to this url. 