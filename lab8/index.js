const mongoose = require("mongoose")
const express = require("express")
const { connectDB } = require("./connectDB.js")
const { populatePokemons } = require("./populatePokemons.js")
const { getTypes } = require("./getTypes.js")
const { handleErr } = require("./errorHandler.js")
const { asyncWrapper } = require("./asyncWrapper.js")
const app = express()
const port = 5500
var pokeModel = null;

const start = async () => {
  // console.log("starting the server");
  await connectDB();
  const pokeSchema = await getTypes();
  pokeModel = await populatePokemons(pokeSchema);

  app.listen(port, (err) => {
    // console.log("app.listen started");
    if (err) console.log(err);
    else
      console.log(`Phew! Server is running on port: ${port}`);
  })
}
start()

class PokemonBadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = 'PokemonBadRequest';
  }
}

class PokemonBadRequestMissingID extends PokemonBadRequest {
  constructor(message) {
    super(message);
    this.name = 'PokemonBadRequestMissingID';
  }
}

class PokemonBadRequestPostFailedToAddPokemon extends PokemonBadRequest {
  constructor(message) {
    super(message);
    this.name = 'PokemonBadRequestPostFailedToAddPokemon';
  }
}

class PokemonBadRequestSpecialValuesReturnEmptyArray extends PokemonBadRequest {
  constructor(message) {
    super(message);
    this.name = 'PokemonBadRequestSpecialValuessReturnEmptyArray';
  }
}

class PokemonBadRequestSpecialValueReturnNull extends PokemonBadRequest {
  constructor(message) {
    super(message);
    this.name = 'PokemonBadRequestSpecialValuesReturnNull';
  }
}

class PokemonBadRequestSpecialValueReturnEmptyStrings extends PokemonBadRequest {
  constructor(message) {
    super(message);
    this.name = 'PokemonBadRequestSpecialValuesReturnEmptyStrings';
  }
}

class PokemonNotFoundError extends PokemonBadRequest {
  constructor(message) {
    super(message);
    this.name = 'PokemonNotFoundError';
  }
}


app.get('/api/v1/pokemons', asyncWrapper(async (req, res, next) => {
  console.log("GET /api/v1/pokemons");
  if (!req.query["count"])
    req.query["count"] = 10
  if (!req.query["after"])
    req.query["after"] = 0
  try {
    const docs = await pokeModel.find({})
      .sort({ "id": 1 })
      .skip(req.query["after"])
      .limit(req.query["count"])
    if (docs == null)
      throw new PokemonBadRequestSpecialValueReturnNull('Error, request return null')
    if (docs == [])
      throw new PokemonBadRequestSpecialValuesReturnEmptyArray('Error, request return empty array')
    if (docs == "")
      throw new PokemonBadRequestSpecialValueReturnEmptyStrings('Error, request return empty strings')
    if (docs.length == 0)
      throw new PokemonNotFoundError('Pokemon not found in DB')
    res.json(docs)
  } catch (err) {
    next(err);
    // res.json(handleErr(err)) 
  }
}))

app.get('/api/v1/pokemon/', () => {
  throw new PokemonBadRequestMissingID('id is required');
})

app.get('/api/v1/pokemon/:id', asyncWrapper(async (req, res, next) => {
  try {
    // const { id } = req.params
    const { id } = req.params
    if (id == undefined)
      throw new PokemonBadRequestMissingID('id is required');
    const docs = await pokeModel.find({ "id": id })
    if (docs.length == 0)
      throw new PokemonNotFoundError('Pokemon not found in DB')
    if (docs.length != 0) res.json(docs)
    else res.json({ errMsg: "Pokemon not found" })
  } catch (err) {
    next(err);
    // res.json(handleErr(err))
  }
}))

app.use(express.json())

app.post('/api/v1/pokemon/', asyncWrapper(async (req, res, next) => {
  try {
    const pokeDoc = await pokeModel.create(req.body)
    // console.log(pokeDoc);
    if (pokeDoc != null || pokeDoc.length > 0) {
      res.json({
        msg: "Added Successfully"
      })
    } else {
      throw new PokemonBadRequestPostFailedToAddPokemon('Pokemon failed to be added');
    }
  } catch (err) {
    next(err);
  }
}))

app.delete('/api/v1/pokemon/:id', async (req, res, next) => {
  try {
    const docs = await pokeModel.findOneAndRemove({ id: req.params.id })
    if (docs)
      res.json({
        msg: "Deleted Successfully"
      })
    else {
      throw new PokemonNotFoundError('Pokemon not found in DB');
    }
    // res.json({
    //   errMsg: "Pokemon not found"
    // })
  } catch (err) {
    next(err);
    // res.json(handleErr(err)) 
  }
})

app.put('/api/v1/pokemon/:id', asyncWrapper(async (req, res, next) => {
  try {
    const selection = { id: req.params.id }
    const update = req.body
    const options = {
      new: true,
      runValidators: true,
      overwrite: true
    }
    const doc = await pokeModel.findOneAndUpdate(selection, update, options)
    // console.log(docs);
    if (docs.length == 0)
      throw new PokemonNotFoundError('Pokemon not found in DB')
    if (doc) {
      res.json({
        msg: "Updated Successfully",
        pokeInfo: doc
      })
    } else {
      throw new PokemonNotFoundError('Pokemon not found in DB');
    }
  } catch (err) {
    next(err);
  }
}))

app.patch('/api/v1/pokemon/:id', asyncWrapper(async (req, res, next) => {
  try {
    const selection = { id: req.params.id }
    const update = req.body
    const options = {
      new: true,
      runValidators: true
    }
    const doc = await pokeModel.findOneAndUpdate(selection, update, options)
    if (doc) {
      res.json({
        msg: "Updated Successfully",
        pokeInfo: doc
      })
    } else {
      throw new PokemonNotFoundError('Pokemon ont found in DB');
    }
  } catch (err) {
    next(err);
  }
}))

// app.get("*", (req, res) => {
//   res.json({
//     msg: "Improper route. Check API docs plz."
//   })
// })
app.use((err, req, res, next) => {
  if (err instanceof PokemonBadRequestMissingID) {
    res.status(400).send(err.message);
  } else if (err instanceof PokemonBadRequestSpecialValuesReturnEmptyArray) {
    res.status(400).send(err.message);
  } else if (err instanceof PokemonNotFoundError) {
    res.status(400).send(err.message);
  } else {
    res.status(500).send(err.message);
  }
})