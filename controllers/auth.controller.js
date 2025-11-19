const userModels = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function signUp(req, res) {
    const { username, email, role, password} = req.body;
    
    try {
        if (!username || !password || !email || !role )  {            
            return res.status(400).send('Todos los campos son obligatorios');
        }
        
        const newUser = await userModels.createUser({
        username,
        email,
        role,
        password
        });
        res.redirect('/login');
    } catch (error) {
        console.error('Error en el registro:', error.message);
        res.status(500).send('Error en el registro');
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await userModels.getUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id_user, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'); //ESTO REVISARLO AL HACER LAS VISTAS
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    } catch (error) {
        res.status(500).send('Error en el inicio de sesión');
    }
}

function logout(req, res) {
    res.clearCookie('token');
    res.redirect('/login');
}

const authControllers ={
    signUp,
    login,
    logout 
}
module.exports = authControllers;