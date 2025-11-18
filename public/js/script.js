
//Nos muestra TODAS las peliculas en relacion con TITLE
document.getElementById("searchButton").addEventListener("click", async (e) => {
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
        <button class="detalle">Detalles</button>
    </div>
`;
    })
// Usamos directamente "title"
    document.querySelectorAll(".detalle").forEach(boton=>{
      boton.addEventListener("click", () => {
     //const selectedTitle = btn.dataset.title;
      window.location.href = `/search/${encodeURIComponent(title)}`;
    });
  }); // <--- cierre del forEach de botones
  }catch (error) {
    console.log(error);
  }

}); // <--- cierre del addEventListener

