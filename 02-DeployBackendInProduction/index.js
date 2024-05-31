require('dotenv').config()
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const userData = {
    "login": "adityakkpk",
    "id": 91123318,
    "node_id": "MDQ6VXNlcjkxMTIzMzE4",
    "avatar_url": "https://avatars.githubusercontent.com/u/91123318?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/adityakkpk",
    "html_url": "https://github.com/adityakkpk",
    "followers_url": "https://api.github.com/users/adityakkpk/followers",
    "following_url": "https://api.github.com/users/adityakkpk/following{/other_user}",
    "gists_url": "https://api.github.com/users/adityakkpk/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/adityakkpk/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/adityakkpk/subscriptions",
    "organizations_url": "https://api.github.com/users/adityakkpk/orgs",
    "repos_url": "https://api.github.com/users/adityakkpk/repos",
    "events_url": "https://api.github.com/users/adityakkpk/events{/privacy}",
    "received_events_url": "https://api.github.com/users/adityakkpk/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Aditya Kumar Kushwaha",
    "company": null,
    "blog": "",
    "location": "Kuchai Kote, Gopalganj, Bihar, India",
    "email": null,
    "hireable": null,
    "bio": "👋 I'm Aditya Kumar Kushwaha.\r\n👨‍💻 Computer Science undergrad | Learning web development | \r\nFuture Software Engineer 🔥|\r\nCoding enthusiast ",
    "twitter_username": "akkpk933",
    "public_repos": 16,
    "public_gists": 0,
    "followers": 3,
    "following": 10,
    "created_at": "2021-09-21T09:27:38Z",
    "updated_at": "2024-02-21T11:37:21Z"
  }

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
});

app.get('/github', (req, res) => {
    res.json(userData);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});