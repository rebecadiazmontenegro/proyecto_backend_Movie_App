//Nos muestra TODAS las peliculas de nuestra BBDD ---> y BOORA al dar al botón de DELETE
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(`/api/movie/bbdd`);
    const data = await res.json();
    console.log(data);
    const result = document.getElementById("Pelisbbdd");
    result.innerHTML = ""; // limpiezas
    
    data.forEach(movie => {
      result.innerHTML += `
        <div class="movie-card">
            <h2>${movie.Title}</h2>
            ${movie.Poster ? `<img src="${movie.Poster}" alt="${movie.Title}" width="200">` : ""}
            ${movie.Year ? `<p><strong>Año:</strong> ${movie.Year}</p>` : ""}
            <button class="delete-btn" movie-title="${movie.Title}">Delete</button>
        </div>
      `;
    });
 
    //listeners del botón de DELETE
    document.querySelectorAll(".delete-btn").forEach(boton => {
      boton.addEventListener("click", async () => {
        const title = boton.getAttribute("movie-title"); //cogemos el titulo de nuestras cards

        const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar la película "${title}"?`);
        if (!confirmDelete) return; // Si el usuario cancela, no hacemos nada


        try {
          const resDelete = await fetch("/api/movie", { //lammamos a nuestro endpoint DELETE
            method: "DELETE", //método---> delete
            headers: { "Content-Type": "application/json" },  // indicamos al servidor que el cuerpo de la petición está en formato JSON
            body: JSON.stringify({ Title: title })  //transformamos el objeto a --> json -- con el título de la peli qeu queremos eliminar
          });

          const dataDelete = await resDelete.json();
          if (resDelete.ok) {
            //alert(dataDelete.message);
            Swal.fire({
            title: "Película eliminada de BBDD!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
            });
            
            boton.parentElement.remove(); // elimina la tarjeta del DOM
          } else {
            alert("Error al eliminar: " + dataDelete.message);
          }

        } catch (error) {
          console.error("Error al eliminar película:", error);
        }
      });
    });

  } catch (error) {
    console.log(error);
  }
}); //cierre de listener para get y delete



//PARA AÑADIR PELÍCULA
document.getElementById("addMovie").addEventListener("click", async (e) => {
  e.preventDefault(); // Evitar que recargue la pag

  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const runtime = document.getElementById("runtime").value;
  const genre = document.getElementById("genre").value;
  const director = document.getElementById("director").value;
  const actors = document.getElementById("actors").value;
  const plot = document.getElementById("plot").value;
  const pais = document.getElementById("pais").value;
  const url = document.getElementById("url").value;
  const rating = document.getElementById("rating").value;
  const opinion = document.getElementById("opinion").value;

  try {
    const res = await fetch("/api/movie", { // endpoint POST
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: title,
        Year: year,
        Runtime: runtime,
        Genre: genre,
        Director: director,
        Actors: actors,
        Plot: plot,
        Country: pais,
        Poster: url,
        imdbRating: rating,
        Opinions: opinion,
      }),
    });

    const data = await res.json();

    if (res.ok) {
       Swal.fire({
        title: "Película guardada en la BBDD!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
            });
      console.log(data);
    } else {
      alert("Error al guardar la película: " + data.message);
      console.log(data);
    }
  } catch (error) {
    console.error("Error al hacer POST:", error);
  }
});




