const mongoose = require("mongoose")
const express = require("express")
const { connectDB } = require("./connectDB.js")
const { populatePokemons } = require("./populatePokemons.js")
const { getTypes } = require("./getTypes.js")
const { handleErr } = require("./errorHandler.js")
const { asyncWrapper } = require("./asyncWrapper.js")
const { pokeUser } = require("./pokeUser.js")
const cors = require("cors")
const app = express()
const dotenv = require("dotenv")
dotenv.config();
const {
  PokemonBadRequest,
  PokemonBadRequestMissingID,
  PokemonBadRequestPostFailedToAddPokemon,
  PokemonBadRequestSpecialValuesReturnEmptyArray,
  PokemonNotFoundError,
  PokemonBadRequestSpecialValueReturnNull,
  PokemonBadRequestSpecialValueReturnEmptyStrings
} = require("./errors.js")
var pokeModel = null;

const start = async () => {
  await connectDB();
  const pokeSchema = await getTypes();
  pokeModel = await populatePokemons(pokeSchema);

  app.listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    else
      console.log(`Phew! Server is running on port: ${process.env.PORT}`);
  })
}
start()

const userModel = require('./pokeUser.js')
app.use(express.json())

const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) {
    throw new PokemonBadRequest("Access denied")
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET) // nothing happens if token is valid
    next()
  } catch (err) {
    throw new PokemonBadRequest("Invalid token")
  }
}

app.use(cors())

app.use(auth) // Boom! All routes below this line are protected

app.get('/api/v1/pokemons', asyncWrapper(async (req, res, next) => {
  console.log("GET /api/v1/pokemons");

  try {
    if (req.query["appid"].length > 1) {
      const appid = req.query["appid"]
      const userStoredJWTTokenFromDB = await userModel.findOne({ jwt: appid })
      if (userStoredJWTTokenFromDB.jwt === req.query["appid"]) {
        if (!req.query["count"])
          req.query["count"] = 10
        if (!req.query["after"])
          req.query["after"] = 0
        const after = parseInt(req.query["after"], 10)
        const count = parseInt(req.query["count"], 10)
        try {
          const docs = await pokeModel.find({})
            .sort({ id: 1 })
            .skip(after)
            .limit(count)
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
        }
      } else {
        throw new PokemonNotFoundError('JWT token does not match JWT token in DB')
      }
    } else {
      throw new PokemonNotFoundError('Missing JWT Token from user as API Key')
    }
  } catch (err) {
    next(err);
  }
}))

app.get('/api/v1/pokemon/', asyncWrapper(async (req, res, next) => {
  console.log("GET /api/v1/pokemon/id");

  try {
    if (req.query["appid"].length > 1) {
      if (req.query["id"].length <= 0) {
        throw new PokemonBadRequestMissingID('id is required');
      }
      const appid = req.query["appid"]
      // console.log(appid)
      const userStoredJWTTokenFromDB = await userModel.findOne({ jwt: appid })
      // console.log(userStoredJWTTokenFromDB)
      if (userStoredJWTTokenFromDB.jwt === req.query["appid"]) {
        try {
          // const { id } = req.params
          // const { id } = req.params
          const id = req.query["id"]
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
      } else {
        throw new PokemonNotFoundError('JWT token does not match JWT token in DB')
      }
    } else {
      throw new PokemonNotFoundError('Missing JWT Token from user as API Key')
    }
  } catch (err) {
    next(err);
  }
}))

// app.get('/api/v1/pokemonImage/:id')              // - get a pokemon Image URL
app.get('/api/v1/pokemonImage/', asyncWrapper(async (req, res, next) => {
  console.log(req.query.id);

  try {
    if (req.query["appid"].length > 1) {
      if (req.query["id"].length <= 0) {
        throw new PokemonBadRequestMissingID('id is required');
      }
      const appid = req.query["appid"]
      const userStoredJWTTokenFromDB = await userModel.findOne({ jwt: appid })
      if (!userStoredJWTTokenFromDB) {
        throw new PokemonBadRequest("JWT token match user not found")
      }
      if (userStoredJWTTokenFromDB.jwt === req.query["appid"]) {

        // Check DB to see if user is admin and has priviledge to perform query to get pokemon image
        if (userStoredJWTTokenFromDB.admin === false || userStoredJWTTokenFromDB.admin !== true) {
          throw new PokemonBadRequest("User's role is not authorize to access pokemon image. Admin Role Privilege is required to access pokemon image.")
        }
        if (userStoredJWTTokenFromDB.admin === true) {
          await pokeModel.find({ id: `${req.query.id}` })
            .then(doc => {
              console.log(doc)
              var idLength = req.query.id.toString().length;
              if (idLength === 3) { req.query.id = req.query.id }
              else if (idLength < 3) {
                req.query.id = "0".repeat(3 - idLength) + req.query.id
              }
              var pokemonImage = { "url": `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${req.query.id}.png` }
              res.json(pokemonImage)
            })
            .catch(err => {
              console.error(err)
              res.json({ msg: "db reading .. err.  Check with server devs" })
            })
        } else {
          throw new PokemonBadRequest("User's role is not authorize to access pokemon image. Admin Role Privilege is required to access pokemon image.")
        }
      } else {
        throw new PokemonNotFoundError('JWT token does not match JWT token in DB')
      }
    } else {
      throw new PokemonNotFoundError('Missing JWT Token from user as API Key')
    }
  } catch (err) {
    next(err);
  }
}))

app.post('/api/v1/pokemon/', asyncWrapper(async (req, res, next) => {
  try {
    console.log(req.query["appid"].length)
    if (req.query["appid"].length > 1) {
      const appid = req.query["appid"]
      const userStoredJWTTokenFromDB = await userModel.findOne({ jwt: appid })
      if (!userStoredJWTTokenFromDB) {
        throw new PokemonBadRequest("JWT token match user not found")
      }
      if (userStoredJWTTokenFromDB.jwt === req.query["appid"]) {

        // Check DB to see if user is admin and has priviledge to perform query to get pokemon image
        if (userStoredJWTTokenFromDB.admin === false || userStoredJWTTokenFromDB.admin !== true) {
          throw new PokemonBadRequest("User's role is not authorize to access pokemon image. Admin Role Privilege is required to access pokemon image.")
        }
        if (userStoredJWTTokenFromDB.admin === true) {
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
        } else {
          throw new PokemonBadRequest("User's role is not authorize to access pokemon image. Admin Role Privilege is required to access pokemon image.")
        }
      } else {
        throw new PokemonNotFoundError('JWT token does not match JWT token in DB')
      }
    } else {
      throw new PokemonNotFoundError('Missing JWT Token from user as API Key')
    }
  } catch (err) {
    next(err);
  }
}))

app.delete('/api/v1/pokemon/', asyncWrapper(async (req, res, next) => {
  console.log(req.query.id);
  try {
    if (req.query["appid"].length > 1) {
      if (req.query["id"].length <= 0) {
        throw new PokemonBadRequestMissingID('id is required');
      }
      const appid = req.query["appid"]
      const userStoredJWTTokenFromDB = await userModel.findOne({ jwt: appid })
      if (!userStoredJWTTokenFromDB) {
        throw new PokemonBadRequest("JWT token match user not found")
      }
      if (userStoredJWTTokenFromDB.jwt === req.query["appid"]) {

        // Check DB to see if user is admin and has priviledge to perform query to get pokemon image
        if (userStoredJWTTokenFromDB.admin === false || userStoredJWTTokenFromDB.admin !== true) {
          throw new PokemonBadRequest("User's role is not authorize to access pokemon image. Admin Role Privilege is required to access pokemon image.")
        }
        if (userStoredJWTTokenFromDB.admin === true) {
          try {
            const docs = await pokeModel.findOneAndRemove({ id: req.query.id })
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
        } else {
          throw new PokemonBadRequest("User's role is not authorize to access pokemon image. Admin Role Privilege is required to access pokemon image.")
        }
      } else {
        throw new PokemonNotFoundError('JWT token does not match JWT token in DB')
      }
    } else {
      throw new PokemonNotFoundError('Missing JWT Token from user as API Key')
    }
  } catch (err) {
    next(err);
  }
}))

app.put('/api/v1/pokemon/', asyncWrapper(async (req, res, next) => {
  console.log(req.query.id);
  try {
    if (req.query["appid"].length > 1) {
      if (req.query["id"].length <= 0) {
        throw new PokemonBadRequestMissingID('id is required');
      }
      const appid = req.query["appid"]
      // console.log(appid)
      const userStoredJWTTokenFromDB = await userModel.findOne({ jwt: appid })
      if (!userStoredJWTTokenFromDB) {
        throw new PokemonBadRequest("JWT token match user not found")
      }
      // console.log(userStoredJWTTokenFromDB)
      if (userStoredJWTTokenFromDB.jwt === req.query["appid"]) {

        // Check DB to see if user is admin and has priviledge to perform query to get pokemon image
        if (userStoredJWTTokenFromDB.admin === false || userStoredJWTTokenFromDB.admin !== true) {
          throw new PokemonBadRequest("User's role is not authorize to access pokemon image. Admin Role Privilege is required to access pokemon image.")
        }
        if (userStoredJWTTokenFromDB.admin === true) {
          try {
            const selection = { id: req.query["id"] }
            const update = req.body
            const options = {
              new: true,
              upsert: true,
              runValidators: true,
              overwrite: true
            }
            const doc = await pokeModel.findOneAndUpdate(selection, update, options)
            console.log(doc)
            if (doc.length == 0)
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
        } else {
          throw new PokemonBadRequest("User's role is not authorize to access pokemon image. Admin Role Privilege is required to access pokemon image.")
        }
      } else {
        throw new PokemonNotFoundError('JWT token does not match JWT token in DB')
      }
    } else {
      throw new PokemonNotFoundError('Missing JWT Token from user as API Key')
    }
  } catch (err) {
    next(err);
  }
}))

app.patch('/api/v1/pokemon/', asyncWrapper(async (req, res, next) => {
  console.log(req.query.id);
  try {
    if (req.query["appid"].length > 1) {
      if (req.query["id"].length <= 0) {
        throw new PokemonBadRequestMissingID('id is required');
      }
      const appid = req.query["appid"]
      const userStoredJWTTokenFromDB = await userModel.findOne({ jwt: appid })
      if (!userStoredJWTTokenFromDB) {
        throw new PokemonBadRequest("JWT token match user not found")
      }
      if (userStoredJWTTokenFromDB.jwt === req.query["appid"]) {

        // Check DB to see if user is admin and has priviledge to perform query to get pokemon image
        if (userStoredJWTTokenFromDB.admin === false || userStoredJWTTokenFromDB.admin !== true) {
          throw new PokemonBadRequest("User's role is not authorize to access pokemon image. Admin Role Privilege is required to access pokemon image.")
        }
        if (userStoredJWTTokenFromDB.admin === true) {
          try {
            const selection = { id: req.query.id }
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
        } else {
          throw new PokemonBadRequest("User's role is not authorize to access pokemon image. Admin Role Privilege is required to access pokemon image.")
        }
      } else {
        throw new PokemonNotFoundError('JWT token does not match JWT token in DB')
      }
    } else {
      throw new PokemonNotFoundError('Missing JWT Token from user as API Key')
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