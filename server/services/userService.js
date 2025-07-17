const bcrypt = require('bcryptjs');
const { tablas } = require('../models');

async function getUsers() {
  try {
    const [users] = await tablas.Users.executeQuery('SELECT * FROM users');
    return users;
  }catch{
    throw new Error('Error al obtener usuarios');
  }
}
// buscar por id
async function getUser(id) {
  try {
    const [user] = await tablas.Users.executeQuery('SELECT * FROM users WHERE id = ?', [id]);
    return user[0];
  } catch{
    throw new Error('Error al obtener el usuario por ID');
  }
}
// buscar por correo
async function getUserByCorreo(correo) {
  try {
    const [user] = await tablas.Users.executeQuery('SELECT * FROM users WHERE correo = ?', [correo]);
    return user[0];
  } catch{
    throw new Error('Error al obtener el usuario por correo');
  }
}

// Crear usuario
async function createUser({
  usuario,
  correo,
  password,
  foto = null,
  biografia = null,
  institucion = null,
  escuela_profesional = null,
  facultad = null,
  tipo_usuario = 'I',
  estado_cuenta = 'activo',
  siguiendo = [],
  seguidos = []
}) {
  try {
    // Validación básica
    if (!password) {
      throw new Error('La contraseña es requerida');
    }

    // Determinar tipo_usuario basado en el correo
    let tipoUsuarioFinal = 'I'; // Por defecto: Invitado
    if (correo && correo.endsWith('@unsaac.edu.pe')) {
      tipoUsuarioFinal = 'E'; // Estudiante
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const siguiendoStr = JSON.stringify(siguiendo ?? []);
    const seguidosStr = JSON.stringify(seguidos ?? []);

    const [result] = await tablas.Users.executeQuery(
      `INSERT INTO users (
        usuario, correo, password, foto, biografia,
        institucion, escuela_profesional, facultad,
        tipo_usuario, estado_cuenta, siguiendo, seguidos
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        usuario,
        correo,
        hashedPassword, // Aquí se guarda la contraseña encriptada
        foto,
        biografia,
        institucion,
        escuela_profesional,
        facultad,
        tipoUsuarioFinal, // Se usa el tipo calculado
        estado_cuenta,
        siguiendoStr,
        seguidosStr
      ]
    );

    return await getUser(result.insertId);
  } catch (err) {
    console.error('Error al crear el usuario:', err);
    throw new Error('Error al crear el usuario');
  }
}


// Eliminar un usuario
async function deleteUser(id) {
  try{
    const result = await tablas.Users.executeQuery('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
  catch{
    throw new Error('Error al eliminar el usuario');
  }
}

// Actualizar un usuario
async function updateUser(id, updateData) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updateData)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  values.push(id);

  const [result] = await tablas.Users.executeQuery(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
    values
  );

  return result.affectedRows > 0 ? await getUser(id) : null;
}

async function consulta()
{
  try {
    const [result] = await tablas.Users.executeQuery(`
      SELECT 
        u.id,
        u.usuario,
        COUNT(p.id) AS total_publicaciones
      FROM 
        users u
      LEFT JOIN 
        publications p ON u.id = p.id_usuario
      GROUP BY 
        u.id, u.usuario
      ORDER BY 
        total_publicaciones DESC
      LIMIT 10;
    `);
    return result;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw new Error('Error al realizar la consulta');
  }
}

async function searchUsersByName(query) {
  try {
    const searchTerm = `%${query}%`;
    const [users] = await tablas.Users.executeQuery(`
      SELECT 
        id,
        usuario,
        correo,
        foto,
        biografia,
        institucion,
        escuela_profesional,
        facultad,
        tipo_usuario
      FROM users 
      WHERE usuario LIKE ? 
      AND estado_cuenta = 'activo'
      ORDER BY usuario ASC
      LIMIT 20
    `, [searchTerm]);
    
    return users;
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    throw new Error('Error al realizar la búsqueda de usuarios');
  }
}


module.exports = {
  getUsers,
  getUser,
  getUserByCorreo,
  createUser,
  updateUser,
  deleteUser,
  consulta,
  searchUsersByName
};
