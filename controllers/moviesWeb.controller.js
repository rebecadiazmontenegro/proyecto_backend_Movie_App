const movieService = require("../services/movies.service");
const allFetch = require("../utils/fetchMovie.utils");

const renderSearch = (req, res) => {
  res.render("search");
};

// moviesWeb.controller.js

const renderMovieDetail = async (req, res) => {
  try {
    const { title } = req.params;

    let movies = await allFetch.fetchOneMovie(title);

    if (!movies || movies.length === 0) {
      movies = await movieService.getMovieService(title);
    }

    if (!movies || movies.length === 0) {
      return res.status(404).render("detalle", { movie: null, message: "Película no encontrada" });
    }

    // Como solo quieres 1 peli:
    const movie = movies[0];

    res.render("detalle", { movie });
  } catch (error) {
    console.error(error);
    res.status(500).render("detalle", { movie: null, message: "Error al cargar la película" });
  }
};




module.exports = {
    renderSearch,
    renderMovieDetail
}