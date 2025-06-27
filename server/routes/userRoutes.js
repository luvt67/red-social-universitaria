const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('foto'); 

const userController = require('../controllers/userController');

//
router.post('/register', userController.register);  
router.post('/login', userController.login); 
router.get('/getusers', userController.getUsers);  
router.post('/create',upload, userController.createUser); 
router.put('/update',upload, userController.updateUser);   
router.delete('/delete/:id', userController.deleteUser);
router.get('/maspublicaciones',userController.consulta);

module.exports = router;


