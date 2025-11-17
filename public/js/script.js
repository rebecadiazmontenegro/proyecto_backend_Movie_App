document.getElementById("searchButton").addEventListener("click", async (e) => {
  const title = document.getElementById("movieName").value;
  alert(title);
  try {
    const res = await fetch(`/api/movie/${title}`); // 
    const data = await res.json();
    alert(data);
    console.log(data);
    document.getElementById("result").innerHTML = `
    <div class="movie-card">
        <h2>${data.Title}</h2>
        ${data.Poster ? `<img src="${data.Poster}" alt="${data.Title}">` : ""}
        ${data.Year ? `<p><strong>Año:</strong> ${data.Year}</p>` : ""}
        ${data.Director ? `<p><strong>Director:</strong> ${data.Director}</p>` : ""}
        ${data.Genre ? `<p><strong>Género:</strong> ${data.Genre}</p>` : ""}
        ${data.Runtime ? `<p><strong>Duración:</strong> ${data.Runtime}</p>` : ""}
        <button class="detalle">Detalles</button>

    </div>
`;
// Usamos directamente "title"
    document.querySelector(".detalle").addEventListener("click", () => {
      window.location.href = `/search/${encodeURIComponent(title)}`;
    });

  } catch (error) {
    console.log(error);
  }

});

