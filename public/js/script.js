//Nos muestra TODAS las peliculas en relacion con TITLE
document.getElementById("searchButton")?.addEventListener("click", async (e) => {
  const title = document.getElementById("movieName").value;
  alert(title);
  try {
    const res = await fetch(`/api/movie/all/${title}`); //
    const data = await res.json();
    //alert(data);
    console.log(data);
    const result = document.getElementById("result");
    result.innerHTML = ""; // limpiamos antes
    data.forEach (movie => {
    result.innerHTML += `
    <div class="movie-card">
        <h2>${movie.Title}</h2>
        ${movie.Poster ? `<img src="${movie.Poster}" alt="${movie.Title}">` : ""}
        ${movie.Year ? `<p><strong>Año:</strong> ${movie.Year}</p>` : ""}
        <a class="detalle" href="/search/${encodeURIComponent(movie.Title)}">Detalles</a>
    </div>
`;
    })
  }catch (error) {
    console.log(error);
  }
}); 

//Borra un favorito dela base de datos
const botonDelete = document.getElementById('deleteButton');
  botonDelete?.addEventListener('click', async () => {
    try {
      const movieId = botonDelete.dataset.id;
      console.log(movieId);
      
      const response = await fetch("/api/favorites", {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar favorito');
      }

      const result = await response.json();
      Swal.fire({
        title: "Favorito eliminado",
        icon: "success",
        draggable: true
      });

      setTimeout(() => {
        location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error.message);
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "No se pudo eliminar el favorito",
        footer: error.message
    });
    }
  });


//Añade un favorito dela base de datos
  const botonFavorite = document.getElementById('favoriteButton');
  botonFavorite?.addEventListener('click', async () => {
    try {
      const movieId = botonFavorite.dataset.id;
      console.log(movieId);
      
      const response = await fetch("/api/favorites", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar favorito');
      }

      const result = await response.json();
       Swal.fire({
        title: "Favorito añadido",
        icon: "success",
        draggable: true
      });

    } catch (error) {
      console.error('Error:', error.message);
        Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "No se pudo añadir favorito",
        footer: error.message
    });
    }
  });
