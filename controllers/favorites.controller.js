const favoritesModel = require("../models/favorites.model");

// GET http://localhost:3000/api/favorites
const getAllFavorites = async (req, res) => {
  try {
    const { userId } = req.body; // ahora lo recibimos desde el body

    if (!userId) {
      return res.status(400).json({ message: "Falta el Id del usuario" });
    }

    const movies = await favoritesModel.getAllFavoritesModel(userId);
    res.status(200).json({ favorites: movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// POST http://localhost:3000/api/favorites
const createFavorite = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
      return res
        .status(400)
        .json({ message: "Faltan datos: Id del user o Id de la película" });
    }
    const result = await favoritesModel.createFavoriteModel(userId, movieId);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE http://localhost:3000/api/favorites
const deleteFavorite = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
      return res.status(400).json({
        message: "Faltan datos: Id del user o Id de la película",
      });
    }

    const result = await favoritesModel.deleteFavoriteModel(userId, movieId);
    res.status(200).json({
      message: "Película eliminada de favoritos",
      deleted: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFavorites,
  createFavorite,
  deleteFavorite,
};
