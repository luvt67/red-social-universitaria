const userService = require('../services/userService');

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userService.login(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
// Controlador para obtener todos los usuarios
async function getUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Controlador para crear un nuevo usuario
async function createUser(req, res) {
  const { username, email, password } = req.body;
  console.log('Creando usuario:', username, email, password);
  try {
    const newUser = await userService.createUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Controlador para actualizar un usuario
async function updateUser(req, res) {
  try {
    const {correo, usuario, biografia, institucion, escuela_profesional, facultad } = req.body;
    const fotoFile = req.file;
    const updateData = {
      usuario,
      biografia,
      institucion,
      escuela_profesional,
      facultad
    };
    if (fotoFile) {
      updateData.foto = fotoFile.buffer;
    }
    const updatedUser = await userService.updateUser(correo, updateData);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Controlador para eliminar un usuario
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  login,
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
