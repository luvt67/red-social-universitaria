const express = require('express');
const router = express.Router();
const upload = require('../utils/saveFiles'); 
const commentController = require('../controllers/commentController');


router.post('/getcomments', commentController.getAllComments);
router.post('/create',upload.none(),commentController.createComment);

module.exports = router;