
/**
 * @author Rebeca, Lucia, Artur <RebecaLuciaArtur@gmail.com> 
 * @exports errorHandler
 * @namespace middlewares
 */

/**
 *
 * @function
 * @param - El objeto de error capturado.
 * @param - Objeto de solicitud de Express.
 * @param - Objeto de respuesta de Express.
 * @param - Función para pasar al siguiente middleware (no se usa aquí).
 * 
 * @example
 * // Uso en app.js
 * app.use(errorHandler);
 * 
 * @returns {void} Envía una respuesta JSON con el código de estado y mensaje de error.
 */

function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);

    // Responder con un mensaje de error genérico o específico
    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Error interno del servidor',
    });
}

module.exports = errorHandler;
