const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesWeb.controller');

router.get("/favorites", favoritesController.getAllFavorites);

module.exports = router;