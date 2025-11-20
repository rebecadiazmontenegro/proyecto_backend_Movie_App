const express = require('express');
const router = express.Router();
const passport = require('passport'); 
const authControllers = require('../controllers/auth.controller');
const authMiddleware = require('../middlewars/authMiddleware');
const authorizeRole = require('../middlewars/roleMiddleware');


//Ruta Signup
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', authControllers.signUp);

// Redirigir de / a /login
router.get('/', (req, res) => res.redirect('/login'));

router.get('/login', (req, res) => res.render('login'));
router.post('/login', authControllers.login);

// Ruta para iniciar sesión con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], prompt: 'select_account' }));

// Callback de Google
router.get("/google/callBack",
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.cookie('token', req.user.token, { httpOnly: true });
        const redirectUrl = req.user.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
        res.redirect(redirectUrl);
    }
);
//router.get('/logout', authControllers.logout);
// router.get('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) return next(err);
//         req.session.destroy(() => {
//             res.clearCookie('connect.sid'); // Eliminar la cookie de sesión
//             res.clearCookie('token'); // Eliminar el token JWT
//             res.redirect('/login');
//         });
//     });
// });

//Log out
router.get('/logout', (req, res) => {
    // Si hubiera una sesión, la destruimos (opcional)
    if (req.session) {
        req.session.destroy(() => {});
    }

    // Borrar cookies
    res.clearCookie('token');
    res.clearCookie('connect.sid');  

    // Redirigir al login
    return res.redirect('/login');
});

router.get('/user/dashboard', authMiddleware, authorizeRole('user'), (req, res) => {
    res.render('userDashboard', { role: 'user' });
});

router.get('/admin/dashboard', authMiddleware, authorizeRole('admin'), (req, res) => {
    res.render('adminDashboard', { role: 'admin' });
});


module.exports = router;


