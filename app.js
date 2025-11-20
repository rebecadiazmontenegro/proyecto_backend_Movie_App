const express = require("express"); //Esta importando express
const cookieParser = require('cookie-parser'); //cookie parser
const app = express(); //Creando el servidor
const port = 3000; //Puerto de pruebas
const passport = require('passport');
require("dotenv").config();


require('./auth/google.auth.js'); // Importar configuración de Google Auth
const session = require('express-session');



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




//Google autentication
// Middleware de sesión y Passport
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());




//Morgan
const morgan = require("./middlewars/morgan.js")
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));



// http://localhost:3000/
app.get("/", (request, response) => {
  //El primer parametro envia petición y el siguiente respustas
  response.send("Hello World!");
});





// Rutas: Habilita el fichero que hemos creado
const movieRoutes = require("./routes/movies.route");
const userRoutes = require("./routes/users.route");
// API: Usar las rutas definidas 
app.use('/api/movie', movieRoutes);
app.use('/api/user', userRoutes);
app.use('/api/favorites', favoritesRoutes);


//Rutas WEB---
const moviesWebRoutes = require("./routes/moviesWeb.routes");
app.use('/',moviesWebRoutes);
//-----


//rutas auth
const authRoutes = require('./routes/auth.routes.js');
app.use(authRoutes);


//Middlewares
const error404 = require("./middlewars/error404.js")
const errorHandler = require('./middlewars/errorHandler.js');


app.use(errorHandler); 
app.use(error404);






//No indica en que puerto y si esta funcionado
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

module.exports = app; // Exportar la app para usarla en tests