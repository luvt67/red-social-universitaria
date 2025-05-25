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

// Insertar
async function createUser({usuario, correo, password, foto = null,biografia = null, institucion = null,
  escuela_profesional = null, facultad = null,
  tipo_usuario = 'I', estado_cuenta = 'activo'
}) {
  try{
    const result = await tablas.Users.executeQuery(
      `INSERT INTO users (
        usuario, correo, password, foto, biografia,
        institucion, escuela_profesional, facultad,
        tipo_usuario, estado_cuenta
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [usuario, correo, password, foto, biografia, institucion, escuela_profesional, facultad, tipo_usuario, estado_cuenta]
    );
    return await getUser(result.insertId);
  }catch{
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


module.exports = {
  getUsers,
  getUser,
  getUserByCorreo,
  createUser,
  updateUser,
  deleteUser
};
