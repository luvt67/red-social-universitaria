const express = require('express');
const router = express.Router();
const upload = require('../utils/saveFiles'); 
const postController = require('../controllers/postController');


router.get('/getposts', postController.getAllPosts);
router.post('/create',upload.single('archivo'), postController.createPost);

module.exports = router;