const postService = require('../services/postService');

async function createPost(req, res){
    try{

        const { id_usuario, descripcion } = req.body;
        const archivo = req.file || null;
        const nombre_archivo = archivo ? archivo.filename : null;
        const newPost = await postService.createPost(id_usuario, descripcion,nombre_archivo);
        res.status(201).json(newPost);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
async function getAllPosts(req, res){
    try{
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {  
    createPost,
    getAllPosts
  };