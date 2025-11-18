const movieController = require('../controllers/movies.controller');
const router = require('express').Router();

// GET http://localhost:3000/api/movie/:title


router.get("/:title", movieController.getAllMovies);


// POST http://localhost:3000/api/movie

router.post("/", movieController.postMovie);

// PUT http://localhost:3000/api/movie

router.put("/", movieController.putMovie);

// DELETE http://localhost:3000/api/movie

router.delete("/", movieController.deleteMovie);

module.exports = router;