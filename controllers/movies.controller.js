const movieService = require("../services/movies.service");
const allFetch = require("../utils/fetchMovie.utils");

// GET http://localhost:3000/api/movie/:title

// getAllMovies
const getAllMovies = async (req, res) => {
  try {
    const { title } = req.params;
    //const movie = await movieService.getMovieService(title);
    let movies = await allFetch.fetchAllMovies(title);

    if(movies.length===0)
      // busca en mongo
       movies = await movieService.getMovieService(title);
  


    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msj: error.message });
  }
};

//GET 

// POST http://localhost:3000/api/movie

const postMovie = async (req, res) => {
  try {
    const movie = await movieService.createMovieService(req.body);
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// PUT http://localhost:3000/api/movie

const putMovie = async (req,res) => {
    try{
        const { Title, ...datosEditarMovie } = req.body;
        const movieActualizado = await movieService.editMovieService({ 
            title: Title, 
            datosEditarMovie 
        });
        if (movieActualizado) {
            res.status(200).json({
            message:"Película actualizada", 
            editMovie: movieActualizado   
            });
        } else {
            res.status(404).json({ mensaje: 'Película no encontrada' });
        }
    }catch(error){
        res.status(500).json({ mensaje: error.message });
    }
}

// DELETE http://localhost:3000/api/movie

const deleteMovie = async (req, res) => {
  try {
    const { Title } = req.body;
    if (!Title)
      return res
        .status(400)
        .json({ message: "Debe especificar el título de la película" });
    await movieService.deleteMovieService(Title);
    res
      .status(200)
      .json({ message: `Se ha borrado la película: '${Title}'.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllMovies,
  postMovie,
  putMovie,
  deleteMovie
};