const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesWeb.controller');
const authMiddleware = require("../middlewars/authMiddleware");

router.get("/favorites", authMiddleware, favoritesController.getAllFavorites);

module.exports = router;
