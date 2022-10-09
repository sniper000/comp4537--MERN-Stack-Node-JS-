const express = require('express')
const mongoose = require('mongoose')
const https = require('https');


const app = express()
const port = 5500


app.listen(port, async () => {
    // 1 - establish the connection the db
    // 2 - create the schema
    // 3 - create the model
    // 4 - populate the db with the pokemons
    try {
        await mongoose.connect('mongodb://localhost:27017/test')
        mongoose.connection.db.dropDatabase();
    } catch (error) {
        console.log('db error');
    }
    console.log(`Example app listening on port ${port}`)
})

const { Schema } = mongoose; 

const pokemonSchema = new Schema({
  "base": {
    "HP": Number,
    "Attack": Number,
    "Defense": Number,
    "Speed": Number,
    "Speed Attack": Number,
    "Speed Defense": Number
      },
  "id": Number,
  "name": {
    "english": String,
    "japanese": String,
    "chinese": String,
    "french": String
  },
  "types": [String],
  "__v": Number
});

const pokemonModel = mongoose.model('pokemons', pokemonSchema); // pokemons is the name of the collection in db

https.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json", (res) => {
    var chunks = ''
    res.on("data", (chunk) => {
        chunks += chunk
    })
    res.on("end", ()=>{
        chunks = JSON.parse(chunks);
        chunks.map(element => {
            pokemonModel.create(element, (err) => {
              if (err) console.log(err);
            })
          })
        console.log(chunks[0]);
    })
})

// app.get('/api/v1/pokemons?count=2&after=10')     // - get all the pokemons after the 10th. List only Two.

//use limit and skip

app.get('/api/v1/pokemons', (req, res) => {
    // console.log(req.query.limit)
    pokemonModel.find({})
      .then(docs => {
        console.log(docs)
        res.json(docs)
      })
      .catch(err => {
        console.error(err)
        res.json({ msg: "db reading .. err.  Check with server devs" })
      })
    // res.json(unicornsJSON)
  })

  // app.post('/api/v1/pokemon')                      // - create a new pokemon
  app.use(express.json())
  app.post('/api/v1/pokemon', (req, res) => {
    // - create a new pokemon
    pokemonModel.create(req.body, function (err) {
      if (err) console.log(err);
      // saved!
    });
    res.json(req.body)
  })

  // app.get('/api/v1/pokemon/:id')                   // - get a pokemon
  app.get('/api/v1/pokemon/:id', (req, res) => {
    console.log(req.params.id);
    pokemonModel.find({ id: `${req.params.id}` })
      .then(doc => {
        console.log(doc)
        res.json(doc)
      })
      .catch(err => {
        console.error(err)
        res.json({ msg: "db reading .. err.  Check with server devs" })
      })
  })

  // app.get('/api/v1/pokemonImage/:id')              // - get a pokemon Image URL
  





  // app.put('/api/v1/pokemon/:id')                   // - upsert a whole pokemon document
  // app.patch('/api/v1/pokemon/:id')                 // - patch a pokemon document or a
                                                    //   portion of the pokemon document
  // app.delete('/api/v1/pokemon/:id')                // - delete a  pokemon 
