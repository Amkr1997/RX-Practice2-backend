const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const { Movie } = require("./model/movie.model");

initializeDatabase();

app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", async (req, res) => res.send("Express started"));

// Get movies.
app.get("/movies", async (req, res) => {
  try {
    const allMovies = await Movie.find();

    if (allMovies) {
      res.status(201).json(allMovies);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// post movie
app.post("/movies", async (req, res) => {
  const { movieTitle, director, genre } = req.body;

  try {
    const newMovie = new Movie({ movieTitle, director, genre });
    const savedMovie = await newMovie.save();

    if (savedMovie) {
      res.status(201).json(savedMovie);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ messge: "Internal server error" });
  }
});

// update movie
app.post("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const movieData = req.body;

  try {
    const updateMovie = await Movie.findByIdAndUpdate(movieId, movieData, {
      new: true,
    });

    if (!updateMovie) {
      res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updateMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete Movie
app.delete("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (deletedMovie) {
      res.status(200).json(deletedMovie);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An internal server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log("Server started running at port", PORT));
