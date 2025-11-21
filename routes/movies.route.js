const movieController = require("../controllers/movies.controller");
const moviesWebController = require("../controllers/moviesWeb.controller");
const router = require("express").Router();
const {validateCreateMovie, validateDeleteMovie} = require("../validators/movies.validator");

// GET http://localhost:3000/api/movie/all/:title


 
/**
 * @swagger
 * /api/movie/all/{title}:
 *   get:
 *     summary: Obtener todas las películas por título
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Título o parte del título de la película
 *     responses:
 *       200:
 *         description: Titulos de las peliculas
 *       400:
 *         description: Error    
 */
router.get("/all/:title", movieController.getAllMovies);



// GET http://localhost:3000/api/movie/titanic
/**
 * @swagger
 * /api/movie/{title}:
 *   get:
 *     summary: Obtener una película por título
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Título de la película
 *     responses:
 *       200:
 *         description: Titulo de la pelicula
 *       400:
 *         description: Error
 */
router.get("/:title", movieController.getOneMovie);




// POST http://localhost:3000/api/movie
/**
 * @swagger
 * /api/movie:
 *   post:
 *     summary: Crear una nueva película
 *     tags:
 *       - Movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *               Year:
 *                 type: integer
 *               Runtime:
 *                 type: string
 *               Genre:
 *                 type: string
 *               Director:
 *                 type: string
 *               Actors:
 *                 type: string
 *               Plot:
 *                 type: string
 *               Country:
 *                 type: string
 *               Poster:
 *                 type: string
 *               imdbRating:
 *                 type: number
 *               Opinions:
 *                 type: array
 *     responses:
 *       201:
 *         description: Titulo de la pelicula
 *       400:
 *         description: Error
 */
router.post("/", validateCreateMovie, movieController.postMovie);




// PUT http://localhost:3000/api/movie
/**
 * @swagger
 * /api/movie:
 *   put:
 *     summary: Actualizar una película existente
 *     tags:
 *       - Movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *                 description: Título de la película a actualizar
 *               Year:
 *                 type: integer
 *               Runtime:
 *                 type: string
 *               Genre:
 *                 type: string
 *               Director:
 *                 type: string
 *               Actors:
 *                 type: string
 *               Plot:
 *                 type: string
 *               Country:
 *                 type: string
 *               Poster:
 *                 type: string
 *               imdbRating:
 *                 type: number
 *               Opinions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Película actualizada
 *       404:
 *         description: Película no encontrada
 *       500:
 *         description: Error 
 */
router.put("/", movieController.putMovie);




// DELETE http://localhost:3000/api/movie
/**
 * @swagger
 * /api/movie:
 *   delete:
 *     summary: Eliminar una película existente
 *     tags:
 *       - Movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *                 description: Título de la película a eliminar
 *     responses:
 *       400:
 *         description: Debe especificar el título de la película
 *       200:
 *         description: Se ha boorado la pelicula
 *       404:
 *         description: Error 
 */
router.delete("/", validateDeleteMovie, movieController.deleteMovie);

module.exports = router;
