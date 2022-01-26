const express = require("express");

const app = express();

app.use(express.json());

const pokemon = [
    {
        name: 'Bulbasaur',
        type: ['Grass', 'Poison'],
        id: 1
    },
    {
        name: 'Charmander',
        type: ['Fire'],
        id: 2
    },
    {
        name: 'Squirtle',
        type: ['Water'],
        id: 3
    },
    {
        name:'Clefairy',
        type: ['Fairy'],
        id: 4
    },
    {
        name: 'Meowth',
        type: ['Normal'],
        id: 5
    }
]

app.get('/pokemon', (req, res) => {
    return res.json(pokemon)
})

let _id = 6;

app.post('/pokemon', (req, res) => {
    const { name, type } = req.body;

    if(!name || !type){
        return res.status(400).send({
            error: 'Please provide name and type'
        });
    }

    const id = _id++;

    const newPokemon = {
        id, 
        name,
        type
    };
    pokemon.push(newPokemon);

    res.status(201).json(movie);
})


app.get('/pokemon/:id', (req, res) => {
    const mon = pokemon.find((mon) => mon.id === Number(req.params.id));

    if(!mon){
        return res.status(404).json({
            error: 'Not found',
          });
    }

    return(res.json(mon))
})


app.all('*', (req, res) => {
    if (req.headers.accept === 'application/json') {
      return res.status(404).json({
        error: 'Not found',
      });
    }
  
    return res.status(404).send(`<!DOCTYPE html>
    <html>
      <body>
          <h1>Page Not Found</h1>
      </body>
      </html>`);
  });
  
  app.listen(8999, () => {
    console.log('pokemon api started at http://localhost:8999');
  });