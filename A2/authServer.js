const express = require("express")
const { handleErr } = require("./errorHandler.js")
const { asyncWrapper } = require("./asyncWrapper.js")
const userModel = require('./pokeUser.js')
const dotenv = require("dotenv")
dotenv.config();
const { connectDB } = require("./connectDB.js")

const app = express()

const start = async () => {
    await connectDB();
  
    app.listen(process.env.authServerPORT, (err) => {
      if (err) console.log(err);
      else
        console.log(`Phew! Auth Server is running on port: ${process.env.authServerPORT}`);
    })
  }
  start()

  app.use(express.json())

  const bcrypt = require('bcrypt');
  app.post('/register', asyncWrapper(async (req, res) => {
    const { username, password, email, admin } = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userWithHashedPassword = { ...req.body, password: hashedPassword };
    const user = await userModel.create(userWithHashedPassword);
    res.send(user)
  }))

  const jwt = require("jsonwebtoken")
app.post('/login', asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body
  const user = await userModel.findOne({ username })
  if (!user) {
    throw new PokemonBadRequest("User not found")
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new PokemonBadRequest("Password is incorrect")
  }
  // console.log(user)

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token)
  res.cookie('jwtToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours

  try {
    // const selection = { id: req.params.id }
    const selection = { username: user.username }
    // const update = req.body
    const update = { jwt: token }
    const options = {
      new: true,
      runValidators: true
    }
    const userStoreJWTToken = await userModel.findOneAndUpdate(selection, update, options)
    // console.log(userStoreJWTToken)
    if (userStoreJWTToken) {
      res.json({
        msg: "Updated Successfully",
        userInfo: userStoreJWTToken
      })
    } else {
      throw new PokemonNotFoundError('User not found in DB');
    }
  } catch (err) {
    next(err);
  }

  // res.send(userStoreJWTToken)
}))

app.post('/logout', asyncWrapper(async (req, res, next) => {
    const { username, password } = req.body
    const user = await userModel.findOne({ username })
    if (!user) {
      throw new PokemonBadRequest("User not found")
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      throw new PokemonBadRequest("Password is incorrect")
    }
  
    // Clear the JWT token off the cookie
    res.clearCookie("jwToken")
  
    try {
      const userRemoveJWTTokenAndLogout = await userModel.updateOne({ username }, { $unset: { jwt: 1 } })
      if (userRemoveJWTTokenAndLogout) {
        res.json({
          msg: "User logged out successfully",
          userInfo: userRemoveJWTTokenAndLogout
        })
      } else {
        throw new PokemonNotFoundError('User JWT token not found in DB');
      }
    } catch (err) {
      next(err);
    }
  }))

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