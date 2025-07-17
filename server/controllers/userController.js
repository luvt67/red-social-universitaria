const bcrypt = require('bcryptjs');
const userService = require('../services/userService');


// Login user
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar usuario por correo
    const user = await userService.getUserByCorreo(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Comparar contraseñas usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Register a new user
async function register(req, res) {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userService.getUserByCorreo(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = await userService.createUser({usuario: username, correo: email, password: password});
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
// Get all users
async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function getuser(req, res) {
  const {id} = req.body;
  try {
    const user = await userService.getUser(id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function createUser(req, res) {
  try {
    // Extrae todos los campos posibles del body
    const {
      usuario,
      correo,
      password,
      biografia,
      institucion,
      escuela_profesional,
      facultad,
      tipo_usuario,
      estado_cuenta,
      siguiendo,
      seguidos
    } = req.body;
    const verificar_correo = await userService.getUserByCorreo(correo);
    if (verificar_correo) {
      return res.status(400).json({ error: "El correo ya está en uso" });
    }

    // Elimina campos vacíos o undefined
    const createDataUser = {};
    const rawFields = {
      usuario,
      correo,
      password,
      biografia,
      institucion,
      escuela_profesional,
      facultad,
      tipo_usuario,
      estado_cuenta
    };

    for (const [key, value] of Object.entries(rawFields)) {
      if (value !== undefined && value !== '') {
        createDataUser[key] = value;
      }
    }

    // Procesa siguiendo y seguidos si llegan como string
    if (siguiendo) createDataUser.siguiendo = JSON.parse(siguiendo);
    if (seguidos) createDataUser.seguidos = JSON.parse(seguidos);

    // Procesa la foto si se subió
    if (req.file) {
      createDataUser.foto = req.file.buffer;
    }
    const newUser = await userService.createUser(createDataUser);
    console.log("Nuevo usuario creado:", newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Controlador para actualizar un usuario
async function updateUser(req, res) {
  try {
    const {correo, usuario, biografia, institucion, escuela_profesional, facultad, password, tipo_usuario, estado_cuenta} = req.body;

    const user = await userService.getUserByCorreo(correo);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updateData = {};
    const rawFields = {usuario, biografia, institucion, escuela_profesional, facultad,password, tipo_usuario, estado_cuenta};

    // Agregar solo los campos no vacíos
    for (const [key, value] of Object.entries(rawFields)) {
      if (value !== undefined && value !== '') {
        updateData[key] = value;
      }
    }
    // Agregar foto si se subió
    const fotoFile = req.file;
    if (fotoFile) {
      updateData.foto = fotoFile.buffer;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No se proporcionaron datos para actualizar" });
    }

    const updatedUser = await userService.updateUser(user.id, updateData);
    res.json(updatedUser);

  } catch (error) {
    console.error("Error al actualizar usuario:", error);
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
async function consulta(req, res) {
  try {
    const result = await userService.consulta();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function searchUsers(req, res) {
  const { query } = req.query;
  try {
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    
    const users = await userService.searchUsersByName(query);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  login,
  register,
  getUsers,
  getuser,
  createUser,
  updateUser,
  deleteUser,
  consulta,
  searchUsers
};
