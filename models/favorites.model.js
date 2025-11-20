const pool = require("../config/db_pgsql"); // conexión a PostgreSQL
const queries = require("../queries/favorites.queries");
const moviesModel = require("../models/movies.model"); // modelo de Mongo
const fetchMovie = require("../utils/fetchMovie.utils"); // función fetchMovieById

// GET http://localhost:3000/api/favorites
const getAllFavoritesModel = async (userId) => {
  const { rows } = await pool.query(queries.getFavoriteById, [userId]);
  const movieIds = rows.map((row) => row.id_movie);

  if (movieIds.length === 0) {
    return [];
  }

  const movies = await Promise.all(
    movieIds.map(async (movieId) => {
      let movieData;

      const apiResult = await fetchMovie.fetchMovieById(movieId);
      if (apiResult.length !== 0) {
        movieData = apiResult;
      }

      if (!movieData || apiResult.length === 0) {
        const movieMongo = await moviesModel.findOne(
          { _id: movieId },
          "-_id -__v"
        );
        if (!movieMongo) return null;
        movieData = movieMongo;
      }

      return movieData;
    })
  );

  return movies.filter((movie) => movie !== null);
};

// POST http://localhost:3000/api/favorites
const createFavoriteModel = async (userId, movieId) => {
  let movieData;

  const apiResult = await fetchMovie.fetchMovieById(movieId);
  if (apiResult.length !== 0) {
    movieData = apiResult;
  }

  if (!movieData || apiResult.length === 0) {
    const movieMongo = await moviesModel.findOne({ _id: movieId }, "-_id -__v");
    if (!movieMongo) {
      throw new Error("La película no existe ni en OMDB ni en MongoDB");
    }
    movieData = movieMongo;
  }
  const { rows } = await pool.query(queries.createFavorite, [userId, movieId]);
  return { favorite: rows[0], movie: movieData };
};

// DELETE http://localhost:3000/api/favorites
const deleteFavoriteModel = async (userId, movieId) => {
  const { rows } = await pool.query(queries.deleteFavorite, [userId, movieId]);
  if (rows.length === 0) {
    throw new Error("La película no estaba en favoritos");
  }
  return rows[0];
};

module.exports = {
  getAllFavoritesModel,
  createFavoriteModel,
  deleteFavoriteModel,
};
