const express = require("express"); //Esta importando express
const app = express(); //Creando el servidor
const port = 3000; //Puerto de pruebas

//Para leer el fichero
require("dotenv").config();

// Habilitar recepción de JSON por mi backend
app.use(express.json());//Esto es un middleware

// Rutas: Habilita el fichero que hemos creado
const movieRoutes = require("./routes/movies.route");
const userRoutes = require("./routes/users.route");

// http://localhost:3000/
app.get("/", (request, response) => {
  //El primer parametro envia petición y el siguiente respustas
  response.send("Hello World!");
});

// API: Usar las rutas definidas 
app.use('/api/movie', movieRoutes);
app.use('/api/user', userRoutes);

//No indica en que puerto y si esta funcionado
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

module.exports = app; // Exportar la app para usarla en tests