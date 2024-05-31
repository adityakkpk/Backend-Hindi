require('dotenv').config()
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.get('/twitter', (req, res) => {
    res.send('akkpk933');
});

app.get('/login', (req, res) => {
    res.send('<h1>Plaease Login</h1>');
});

app.get('/yt', (req, res) => {
    res.send('<h2>Youtube</h2>');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});