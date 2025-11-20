const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller');

router.get("/", favoritesController.getAllFavorites);
router.post('/', favoritesController.createFavorite);
router.delete("/", favoritesController.deleteFavorite);



module.exports = router;
