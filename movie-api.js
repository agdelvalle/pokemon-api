const express = require('express')

const app = express();

app.use(express.json());

const movies = [
    {
        id: '11111',
        title: 'Spiderman',
        language: 'Eng'
    }
]

app.get('/movies', (req, res) => {
    return res.json(movies);
})

let _id = 1;

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;

    const movie = movies.find((mov) => mov.id === Number(req.params.id))

    if (!movie) {
        return res.status(404).json({
          error: 'Not found',
        });
      }
    
    return res.json(movie);
})

app.post('/movies', (req, res) => {
    const {title, language } = req.body;

    if(!title || !language){
        return res.status(400).json({
            error: "Title and language are required"
        });
    }

    const movie = {
        title,
        language,
        id: String(_id++)
    }

    movies.push(movie)

    res.status(201).json()
});

app.listen(8999, () => {
    console.log('movie api started at localhost')
})