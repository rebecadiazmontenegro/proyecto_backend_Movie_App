const express = require("express");
const moviesWebController = require("../controllers/moviesWeb.controller");
const router = express.Router();
// Home
router.get("/search",moviesWebController.renderHome);

// Página detalle de película
router.get("/search/:title", moviesWebController.renderMovieDetail);


module.exports = router;

