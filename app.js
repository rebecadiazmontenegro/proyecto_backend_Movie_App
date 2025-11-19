const express = require("express"); //Esta importando express
const app = express(); //Creando el servidor
const port = 3000; //Puerto de pruebas
const authRoutes = require('./routes/auth.routes.js');
const errorHandler = require('./middlewars/errorHandler.js'); // Importar el middleware
const cookieParser = require('cookie-parser'); //cookie parser
 
//Para leer el fichero
require("dotenv").config();




//-------Configurar PUG como motor de vistas-------
app.set('view engine', 'pug');
app.set('views','./views');
//-------------------------------------------------
// Middlewares para parsear datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Visualizar archivos estatico de public-------
app.use(express.static('public')); // Para servir archivos estáticos del front CSS, JS, assets
//-------
app.use(cookieParser());






//Middlewares
const error404 = require("./middlewars/error404.js")

//Morgan
const morgan = require("./middlewars/morgan.js")

app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));



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
//rutas auth
app.use(authRoutes);
//middleware
app.use(errorHandler); 
app.use(error404);

//No indica en que puerto y si esta funcionado
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

module.exports = app; // Exportar la app para usarla en tests