const {param, query, body} = require("express-validator");


const validateCreateMovie = [
  body("Title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title should be a string"),

  body("Year")
    .exists()
    .withMessage("Year is required")
    .isNumeric()
    .withMessage("Year should be numeric"),

  body("Runtime")
    .exists()
    .withMessage("Runtime is required")
    .isString()
    .withMessage("Runtime should be a string"),

  body("Genre")
    .exists()
    .withMessage("Genre is required")
    .isString()
    .withMessage("Genre should be a string"),

  body("Director")
    .exists()
    .withMessage("Director is required")
    .isString()
    .withMessage("Director should be a string"),

  body("Actors")
    .exists()
    .withMessage("Actors are required")
    .isString()
    .withMessage("Actors should be a string"),

  body("Plot")
    .exists()
    .withMessage("Plot is required")
    .isString()
    .withMessage("Plot should be a string"),

  body("Country")
    .exists()
    .withMessage("Country is required")
    .isString()
    .withMessage("Country should be a string"),

  body("Poster")
    .exists()
    .withMessage("Poster is required")
    .isURL()
    .withMessage("Poster should be a valid URL"),

  body("imdbRating")
    .exists()
    .withMessage("imdbRating is required")
    .isNumeric()
    .withMessage("imdbRating should be numeric")
];

// Validación para eliminar una película
const validateDeleteMovie = [
  param("Title")
    .exists()
    .withMessage("Title is required to delete a movie")
    .isString()
    .withMessage("Title should be a string")
];

module.exports = {
   validateCreateMovie,
   validateDeleteMovie
}