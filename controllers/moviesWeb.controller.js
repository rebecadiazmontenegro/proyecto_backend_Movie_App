const movieService = require("../services/movies.service");

const renderHome = (req, res) => {
  res.render("search");
};

// moviesWeb.controller.js

const renderMovieDetail = async (req, res) => {
  try {
    const { title } = req.params;
    const movie = await movieService.getMovieService(title);

    if (!movie || movie.message) {
      return res.status(404).render("detalle", { movie: null, message: "Película no encontrada" });
    }

    res.render("detalle", { movie });
  } catch (error) {
    console.error(error);
    res.status(500).render("detalle", { movie: null, message: "Error al cargar la película" });
  }
};



module.exports = {
    renderHome,
    renderMovieDetail
}