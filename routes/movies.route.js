const movieController = require("../controllers/movies.controller");
const moviesWebController = require("../controllers/moviesWeb.controller");
const router = require("express").Router();

// GET http://localhost:3000/api/movie/all/:title
router.get("/all/:title", movieController.getAllMovies);

// GET http://localhost:3000/api/movie/titanic
router.get("/:title", movieController.getOneMovie);

// GET http://localhost:3000/api/movie/id/1234
router.get("/id/:id", movieController.getMovieById);

// POST http://localhost:3000/api/movie
router.post("/", movieController.postMovie);

// PUT http://localhost:3000/api/movie
router.put("/", movieController.putMovie);

// DELETE http://localhost:3000/api/movie
router.delete("/", movieController.deleteMovie);

module.exports = router;
