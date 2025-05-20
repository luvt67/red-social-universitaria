const { tablas } = require('../models');

// Servicio para obtener todos los usuarios
async function getAllUsers() {
  try {
    const users = await tablas.User.findAll();
    return users;
  } catch (error) {
    throw new Error('Error al obtener usuarios: ' + error.message);
  }
}

async function login(email,password){
  try{
    const [user] = await tablas.User.findByEmail(email);    
    if(!user)
        throw new Error('Usuario o contraseña incorrectos');
    else{
      if(user[0].password === password)
      {
        return user[0];
      }
    }
  } catch(error)
  {
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
}

// Servicio para crear un nuevo usuario
async function createUser(username, email, password) {
  try {
    const newUser = await tablas.User.createUser(username, email, password);
    return newUser;
  } catch (error) {
    throw new Error('Error al crear usuario: ' + error.message);
  }
}

// Servicio para actualizar un usuario
async function updateUser(correo, updateData) {
  try {
    const [updatedUser] = await tablas.User.updateProfile(correo, updateData);
    return updatedUser[0];
  } catch (error) {
    throw new Error('Error al actualizar usuario: ' + error.message);
  }
}

// Servicio para eliminar un usuario
async function deleteUser(id) {
  try {
    await tablas.User.deleteUser(id);
    return { message: 'Usuario eliminado exitosamente' };
  } catch (error) {
    throw new Error('Error al eliminar usuario: ' + error.message);
  }
}

module.exports = {
  login,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};
