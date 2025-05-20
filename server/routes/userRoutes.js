const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('foto'); 

const userController = require('../controllers/userController');

// Rutas para manejar usuarios
router.get('/', userController.getUsers);         // Obtener todos los usuarios
router.post('/', userController.createUser);     // Crear un nuevo usuario
router.put('/update',upload, userController.updateUser);   // Actualizar usuario por correo
router.delete('delete', userController.deleteUser); // Eliminar usuario por ID
router.post('/login', userController.login); // verificar credenciales

module.exports = router;


