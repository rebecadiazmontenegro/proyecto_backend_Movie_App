const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesWeb.controller');
const authMiddleware = require("../middlewars/authMiddleware");



/**
 * @swagger
 * /favorites:
 *   get:
 *     tags:
 *       - Favorites
 *     summary: Obtener todos los favoritos del usuario
 *     description: Devuelve la lista completa de favoritos del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de favoritos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 10
 *                   movieId:
 *                     type: integer
 *                     example: 55
 *       401:
 *         description: Usuario no autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido o no proporcionado"
 *       500:
 *         description: Error interno al obtener los favoritos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los favoritos"
 */

router.get("/favorites", authMiddleware, favoritesController.getAllFavorites);

module.exports = router;
