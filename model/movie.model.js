const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieTitle: String,
  director: String,
  genre: String,
});

const Movie = mongoose.model("newMovie", movieSchema);

module.exports = { Movie };
