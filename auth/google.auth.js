const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const userModels = require('../models/users.model'); // Importar funciones del modelo de usuario
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    console.log('Google profile received:', profile); // Log para verificar el perfil recibido
    try {
        // Buscar usuario por email
        let user = await userModels.getUserByEmail(profile.emails[0].value);

        // Si no existe, crearlo con rol 'user'
           if (!user) {
            console.log('Usuario no encontrado, creando uno nuevo.');

            await userModels.createUser({
                username: profile.displayName,
                email: email,
                role: 'user',
                password: '123ABCgoogle$' // No se usará pero requiere campo
            });

            user = await userModels.getUserByEmail(email);
        }

        // Generar un JWT para el usuario
          const token = jwt.sign(
            { id: user.id_user, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log('JWT generado:', token);
        return done(null, { user, token });
    } catch (error) {
        console.error('Error en la estrategia de Google:', error.message);
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});