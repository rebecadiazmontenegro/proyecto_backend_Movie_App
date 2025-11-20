const Movie = require("../models/movies.model");

// GET buscar por título
const getMovieService = async (title) => {
  try {
    if (!title) {
      return { message: "Por favor, introduce un título" };
    } else {
      const movies = await Movie.find({ Title: title }, "-_id -__v");
      return movies;
    }
  } catch (error) {
    return { message: "Error al obtener las película", details: error.message };
  }
};

// GET buscar por id
const getMovieByIdService = async (id) => {
  try {
    if (!id) {
      return { message: "Por favor, introduce un título" };
    } else {
      const movies = await Movie.find({ _id: id }, "-_id -__v");
      return movies;
    }
  } catch (error) {
    return { message: "Error al obtener las película", details: error.message };
  }
};


// POST

async function createMovieService({
  Title,
  Year,
  Runtime,
  Genre,
  Director,
  Actors,
  Plot,
  Country,
  Poster,
  imdbRating,
  Opinions,
}) {
  try {
    const newMovie = new Movie({
      Title,
      Year,
      Runtime,
      Genre,
      Director,
      Actors,
      Plot,
      Country,
      Poster,
      imdbRating,
      Opinions,
    });
    const savedMovie = await newMovie.save();
    return savedMovie;
  } catch (error) {
    return {
      error: true,
      message: "Error al crear el pelicula",
      details: error.message,
    };
  }
}

// PUT

const editMovieService = async ({ title, datosEditarMovie }) => {
  return await Movie.findOneAndUpdate({ Title: title }, datosEditarMovie, {
    new: true,
  }); //Método de Mongoose que busca un documento por su ID y lo actualiza .findByIdAndUpdate()
};

// DELETE

async function deleteMovieService(Title) {
  try {
    const result = await Movie.deleteOne({ Title });
    if (result.deletedCount === 0) {
      return {
        message: `No se encontró la película con el nombre '${Title}'`,
      };
    }
    return {
      message: `Se ha borrado la película: '${Title}'`,
    };
  } catch (error) {
    return {
      message: "Error al eliminar la película",
      details: error.message,
    };
  }
}



module.exports = {
  getMovieService,
  getMovieByIdService,
  createMovieService,
  editMovieService,
  deleteMovieService,
};
