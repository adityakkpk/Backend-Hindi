import express from 'express';

const app = express();

// app.get('/', (req, res) => {
//     res.send('Server is ready')
// });

// get a list of 5 jokes
const jokes = [
    {
        id: 1,
        title: 'A joke',
        joke: 'Why did the chicken cross the road? To get to the other side!'
    },
    {
        id: 2,
        title: 'Another joke',
        joke: 'This is another joke'
    },
    {
        id: 3,
        title: 'Yet another joke',
        joke: 'This is yet another joke'
    },
    {
        id: 4,
        title: '4th joke',
        joke: 'This is 4th joke'
    },
    {
        id: 5,
        title: '5th joke',
        joke: 'This is 5th joke'
    }
]

app.get('/api/jokes', (req, res) => {
    res.json(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});