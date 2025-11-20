const pool = require("../db/sqlConnection");
const queries = require("../queries/favorites.queries");

const getFavoritesByUser = async (userId) => {
  try {
    const { rows } = await pool.query(queries.getFavoriteById, [userId]);
    return rows.map(row => row.id_movie);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const addFavorite = async (userId, movieId) => {
  try {
    const { rows } = await pool.query(queries.createFavorite, [userId, movieId]);
    return rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { getFavoritesByUser, addFavorite };
