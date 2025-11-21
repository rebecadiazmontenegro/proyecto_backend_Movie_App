/**
 * @author Rebeca, Lucia, Artur <RebecaLuciaArtur@gmail.com> 
 * @exports morgan
 * @namespace middlewares
 */

/**
 * @name host
 * @function
 * @param  - Objeto de solicitud de Express.
 * @param  - Objeto de respuesta de Express.
 * @returns  Hostname de la petición.
 */

const morgan = require('morgan')
morgan.token('host', function (req, res) {
    return req.hostname;
});



/**
 * @name body
 * @function
 * @param  - Objeto de solicitud de Express.
 * @param  - Objeto de respuesta de Express.
 * @returns  String JSON del body de la petición.
 */
morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
});


/**
 * @name param
 * @function
 * @param - Objeto de solicitud de Express.
 * @param  - Objeto de respuesta de Express.
 * @param  - Nombre del parámetro de ruta a registrar.
 * @returns  Valor del parámetro solicitado.
 */
morgan.token('param', function (req, res, param) {
    return req.params[param];
 });

 module.exports = morgan