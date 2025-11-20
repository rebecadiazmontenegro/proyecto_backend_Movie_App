require('dotenv').config(); //para cargar

//https://www.omdbapi.com/?apikey=bf537033&s=avatar
// fetchAllfilms --> TODAS ---> Para Search
const fetchAllMovies = async (title) => {
  const apiKey = process.env.MY_API_KEY;
  //console.log(`https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`)
try {
    if (!title) throw new Error("Se requiere un título de película");
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`
    );
    const data = await response.json();
    if (data.Response === "False") {
      return []; // no se encontró. Length = 0
    }
    return data.Search; // [{},{},{}]
  }catch(error){
    console.error("Error al obtener detalles de la película:", error.message);
    return [];  // no se encontró. Length = 0
  }
}

// GET Una pelicula ----> Esto nos sirve por detalle.
const fetchOneMovie = async (title) => {
  const apiKey = process.env.MY_API_KEY;
  //console.log(`https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
try {
    if (!title) throw new Error("Se requiere un título de película");
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`
    );
    const data = await response.json();
    if (data.Response === "False") {
      return []; // no se encontró. Length = 0
    }
    return [data]; // [{},{},{}]
  }catch(error){
    console.error("Error al obtener detalles de la película:", error.message);
    return [];  // no se encontró. Length = 0
  }
}

//GET Una pelicula por ID ---> Esto nos sirve para favoritos.
const fetchMovieById = async (id) => {
  const apiKey = process.env.MY_API_KEY;
  //console.log(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
try {
    if (!id) throw new Error("Se requiere un título de película");
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
    );
    const data = await response.json();
    if (data.Response === "False") {
      return []; // no se encontró. Length = 0
    }
    return data; // [{},{},{}]
  }catch(error){
    console.error("Error al obtener detalles de la película:", error.message);
    return [];  // no se encontró. Length = 0
  }
}

// GET PELI POR TITULO EXACTO de OMDB --> Esta para el buscador + ruta GET vista detalle
// fetchFilmDetail
//fetchFilmByTitle
// Obtener vista detalle de 1 película
//https://www.omdbapi.com/?apikey=bf537033&t=Avatar:%20The%20Way%20of%20Water


// GET PELI POR ID de OMDB
// https://www.omdbapi.com/?apikey=bf537033&i=tt9018736
// fetchFilmByID -> Esta la usará GET favortios





const allFetch = {

  fetchAllMovies,
  fetchOneMovie,
  fetchMovieById
};

module.exports = allFetch;

//fetchFilm("avatar").then(data => console.log(data));