const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 3,
    max: 20
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
    max: 1000,
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 3
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 3
  },
  jwt: {
    type: String,
    required: false,
    index: {
      unique: true,
      partialFilterExpression: { jwt: { $type: 'string' } },
    },
    trim: true,
    min: 3
  },
  admin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('pokeUser', schema) //pokeUser is the name of the collection in the db
