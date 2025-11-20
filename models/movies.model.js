const mongoose = require("mongoose");
require("../config/db_mongo"); // Conexión a BBDD MongoDB

const objectSchema = {
  Title: {
    type: String,
    required: true,
  },
  Year: {
    type: Number,
    required: true,
  },
  Runtime: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  Director: {
    type: String,
    required: true,
  },
  Actors: {
    type: String,
    required: true,
  },
  Plot: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Poster: {
    type: String,
    required: true,
  },
  imdbRating: {
    type: Number,
    required: true,
  },
  Opinions: {
    type: Array,
    required: false,
  },
};

// Crear el esquema
const moviesSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Movie = mongoose.model("Movie", moviesSchema);

module.exports = Movie;