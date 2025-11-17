const user = require("../models/users.model"); // Importar el modelo de la BBDD

// GET http://localhost:3000/api/user/correo

const getUserByEmail = async (req, res) => {
  try {

    if (!req.params.email) {
      return res.status(400).json({
        message: "Debes proporcionar un correo"
      });
    }

    const users = await user.getUserByEmail(req.params.email);
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: `Usuario no encontrado con el correo ${req.params.email}`
      });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener los autores:', error);
    res.status(500).json({
      message: 'Error al obtener los autores',
      error: error.message
    });
  }
};

// POST http://localhost:3000/api/authors/
const createUser = async(req,res) =>{
    try {
        const {username, email, role, password } = req.body;
        if (!username || !email || !role || !password ) {
            return res.status(400).json({
                message: "Faltan datos obligatorios (username, email, role, password )",
            });
        }
        const result = await user.createUser({username, email, role, password });

         if (result > 0) {
            res.status(201).json({ message: `User creado correctamente ${email}` });
        } else {
            res.status(404).json({ message: 'No se fue posible crear este user' });
        }
    }catch(error){
        console.error('Error al crear este author:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
  getUserByEmail,
  createUser
};