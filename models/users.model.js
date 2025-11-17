const queries = require("../queries/users.queries"); // Queries SQL
const pool = require("../config/db_pgsql");

// GET http://localhost:3000/api/movies
const getUserByEmail = async (email) => {
  let client, result;

  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getUserByEmail, [email]);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }

  return result;
};

// POST http://localhost:3000/api/movies/ 
const createUser = async (user) =>{
    const { username, email, role, password } = user;
    let client, result;
    try{
        client = await pool.connect(); // Espera conexión con la base de datos
        const data = await client.query(queries.createUser, [username, email, role, password]); // Lanza la query DELETE
        result = data.rowCount; // rowCount = cuántas filas fueron creadas (si es 1 ha sido exitoso)
    }catch(error){
        console.error('Error al crear el User:', error);
        throw error;
    }finally {
        client.release(); // Libera la conexión al pool
    }
    return result; // Devuelve 1 si se borró, 0 si no se encontró

}

const userModel = {
  getUserByEmail,
  createUser
};

module.exports = userModel;
