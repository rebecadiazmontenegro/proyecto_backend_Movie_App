/**
 * @author Rebeca, Lucia, Artur <RebecaLuciaArtur@gmail.com> 
 * @exports roleMiddleware
 * @namespace middlewares
 */

/**
 * Middleware de autorización basado en roles.
 * @function
 * @param  - Rol requerido para acceder a la ruta (por ejemplo: "admin" o "user").
 * @returns Middleware de Express que valida el rol del usuario.
 */

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role === role) {
            return next();
        } else {
            return res.status(403).send('Acceso denegado');
        }
    };
}

module.exports = authorizeRole;
