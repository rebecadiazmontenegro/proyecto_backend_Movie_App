const express = require("express");
const moviesWebController = require("../controllers/moviesWeb.controller");
const router = express.Router();
// Home
router.get("/search",moviesWebController.renderSearch);

// Página detalle de película
router.get("/search/:title", moviesWebController.renderMovieDetail);


module.exports = router;

