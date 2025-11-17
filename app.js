const express = require("express"); //Esta importando express
const app = express(); //Creando el servidor
const port = 3000; //Puerto de pruebas

//Para leer el fichero
require("dotenv").config();

//******Configurar PUG como motor de vistas**********
app.set('view engine', 'pug');
app.set('views','./views');
//**************************************************
// Middlewares para parsear datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Visualizar archivos estatico de public***************
app.use(express.static('public')); // Para servir archivos estáticos del front CSS, JS, assets
//**********

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


//Rutas WEB******************************
const moviesWebRoutes = require("./routes/moviesWeb.routes");
app.use('/',moviesWebRoutes);
//*******************************************

//No indica en que puerto y si esta funcionado
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

module.exports = app; // Exportar la app para usarla en tests