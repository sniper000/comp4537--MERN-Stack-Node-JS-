const { mongoose } = require('mongoose')

const connectDB = async () => {
  try {
    try {
      const x = await mongoose.connect('mongodb://localhost:27017/test')
      console.log("Connected to db");
    } catch (error) {
      console.log("PokemonDb Error! Failed to connect");
    }
    mongoose.connection.db.dropDatabase();
    console.log("Dropped db");
    // get the data from Github 
  } catch (error) {
    console.log('db error');
  }
}

module.exports = { connectDB }