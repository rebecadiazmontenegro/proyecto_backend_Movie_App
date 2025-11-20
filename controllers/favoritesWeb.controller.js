const favoritesModel = require("../models/favorites.model");

//GEL trae todas las peliculas y las renderiza en el pug 
//Para buscar http://localhost:3000/favorites
const getAllFavorites = async (req, res) => {
  try {
    const userId = req.user.id; 

    const favorites = await favoritesModel.getAllFavoritesModel(userId);
    res.render("favorites", { favorites });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const createFavorite = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { movieId } = req.body;

    const result = await favoritesModel.createFavoriteModel(userId, movieId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



module.exports = { getAllFavorites, createFavorite};
