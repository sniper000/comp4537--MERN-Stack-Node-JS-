const mongoose = require("mongoose")
const express = require("express")
const https = require('https');
const { connectDB } = require("./connectDB.js")
const { populatePokemons } = require("./populatePokemons.js")
const { getTypes } = require("./getTypes.js")
const { handleErr } = require("./errorHandler.js")
const app = express()
const port = 5500
var pokeModel = null;

const start = async () => {
  // console.log("starting the server");
  await connectDB();
  const pokeSchema = await getTypes();
  // pokeModel = await populatePokemons(pokeSchema);

  app.listen(port, (err) => {
    // console.log("app.listen started");
    if (err) console.log(err);
    else
      console.log(`Phew! Server is running on port: ${port}`);
  })
}
start()

const pokemonModel = generatePokemonModel();

// app.get('/api/v1/pokemons?count=2&after=10')     // - get all the pokemons after the 10th. List only Two.
app.get('/api/v1/pokemons', async (req, res) => {
  console.log("GET /api/v1/pokemons");
  if (!req.query["count"])
    req.query["count"] = 10
  if (!req.query["after"])
    req.query["after"] = 0
  try {
    const docs = await pokemonModel.find({})
      .sort({ "id": 1 })
      .skip(req.query["after"])
      .limit(req.query["count"])
    res.json(docs)
  } catch (err) { res.json(handleErr(err)) }
})

// app.get('/api/v1/pokemon/:id')                   // - get a pokemon
app.get('/api/v1/pokemon/:id', async (req, res) => {
  try {
    const { id } = req.params
    // const docs = await pokeModel.find({ "id": id })
    const docs = await pokemonModel.find({ "id": id })
    if (docs.length != 0) res.json(docs)
    else res.json({ errMsg: "Pokemon not found" })
  } catch (err) { res.json(handleErr(err)) }
})

// app.get('/api/v1/getPokemonswithRegex?searchQuery=pika_')  //autocomplete a pokemon
app.get('/api/v1/getPokemonswithRegex', async (req, res) => {
  try {
    // const { id } = req.params
    const { searchQuery } = req.query
    const query = {}
    if (searchQuery) query.searchQuery = searchQuery
    console.log(query)
    // let results = pokemonModel.find(query)
    let results = pokemonModel.find({ "name.english": searchQuery})
    let pokemons = []
    pokemons = await results
    // const docs = await pokemonModel.find({ "id": id })
    if (pokemons.length != 0) res.json(pokemons)
    else res.json({ errMsg: "Pokemon not found" })
  } catch (err) { res.json(handleErr(err)) }
})

app.use(express.json())

// app.post('/api/v1/pokemon')                      // - create a new pokemon
app.post('/api/v1/pokemon/', async (req, res) => {
  try {
    const pokeDoc = await pokemonModel.create(req.body)
    // console.log(pokeDoc);
    res.json({
      msg: "Added Successfully"
    })
  } catch (err) { res.json(handleErr(err)) }
})

// app.get('/api/v1/pokemonImage/:id')              // - get a pokemon Image URL
app.get('/api/v1/pokemonImage/:id', (req, res) => {
  console.log(req.params.id);
  pokemonModel.find({ id: `${req.params.id}` })
    .then(doc => {
      console.log(doc)
      var idLength = req.params.id.toString().length;
      if (idLength === 3) { req.params.id = req.params.id }
      else if (idLength < 3) {
        req.params.id = "0".repeat(3 - idLength) + req.params.id
      }
      var pokemonImage = { "url": `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${req.params.id}.png` }
      res.json(pokemonImage)
    })
    .catch(err => {
      console.error(err)
      res.json({ msg: "db reading .. err.  Check with server devs" })
    })
})

// app.delete('/api/v1/pokemon/:id')                // - delete a  pokemon 
app.delete('/api/v1/pokemon/:id', async (req, res) => {
  try {
    const docs = await pokemonModel.findOneAndRemove({ id: req.params.id })
    if (docs)
      res.json({
        msg: "Deleted Successfully"
      })
    else
      res.json({
        errMsg: "Pokemon not found"
      })
  } catch (err) { res.json(handleErr(err)) }
})

// app.put('/api/v1/pokemon/:id')                   // - upsert a whole pokemon document
app.put('/api/v1/pokemon/:id', async (req, res) => {
  try {
    const selection = { id: req.params.id }
    const update = req.body
    const options = {
      new: true,
      runValidators: true,
      overwrite: true
    }
    const doc = await pokemonModel.findOneAndUpdate(selection, update, options)
    // console.log(docs);
    if (doc) {
      res.json({
        msg: "Updated Successfully",
        pokeInfo: doc
      })
    } else {
      res.json({
        msg: "Not found",
      })
    }
  } catch (err) { res.json(handleErr(err)) }
})

// - patch a pokemon document or a portion of the pokemon document
app.patch('/api/v1/pokemon/:id', async (req, res) => {
  try {
    const selection = { id: req.params.id }
    const update = req.body
    const options = {
      new: true,
      runValidators: true
    }
    const doc = await pokemonModel.findOneAndUpdate(selection, update, options)
    if (doc) {
      res.json({
        msg: "Updated Successfully",
        pokeInfo: doc
      })
    } else {
      res.json({
        msg: "Not found",
      })
    }
  } catch (err) { res.json(handleErr(err)) }
})

app.get("*", (req, res) => {
  res.json({
    msg: "Improper route. Check API docs plz."
  })
})

function generatePokemonModel() {
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
    "id": { type: Number, unique: true },
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
    var chunks = '';
    res.on("data", (chunk) => {
      chunks += chunk;
    });
    res.on("end", () => {
      chunks = JSON.parse(chunks);
      chunks.map(element => {
        pokemonModel.create(element, (err) => {
          if (err)
            console.log(err);
        });
      });
      console.log(chunks[0]);
    });
  });
  return pokemonModel;
}
