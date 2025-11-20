const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller');
const authMiddleware = require("../middlewars/authMiddleware");


router.get("/", authMiddleware,favoritesController.getAllFavorites);
router.post('/', authMiddleware,favoritesController.createFavorite);
router.delete("/",authMiddleware, favoritesController.deleteFavorite);



module.exports = router;
