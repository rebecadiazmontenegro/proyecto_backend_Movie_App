const jwt = require('jsonwebtoken');

/**
 * @author Rebeca, Lucia, Artur <RebecaLuciaArtur@gmail.com> 
 * @exports checkApiKey
 * @namespace middlewares
 */

/**
  * Función para comprobar si tiene API KEY
  * <pre>
  * Ejemplo:
  * GET http://localhost:3000/products?API_KEY=123abc
  * </pre>
  * @memberof middlewares 
  * @method checkApiKey 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @param {Object} next función que pasa a siguiente estado si la comprobación es correcta 
  * @throws {error} API KEY no proveída o errónea
  */

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.redirect('/login');
        req.user = decoded;
        next();
    });
}

module.exports = authMiddleware;