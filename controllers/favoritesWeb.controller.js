const favoritesModel = require("../models/favorites.model");

const getAllFavorites = async (req, res) => {
  try {
    const userId = req.session.userId;

    const movies = await favoritesModel.getAllFavoritesModel(userId);

    // 👇 Renderiza la vista "favorites" y le pasa los datos
    res.status(200).render("favorites", { favorites: movies });

  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: error.message });
  }
};

const favoritesController = {
  getAllFavorites,
};

module.exports = favoritesController;
