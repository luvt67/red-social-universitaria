const comments = require('../services/commentService');

async function createComment(req, res){
    try{
        const {id_publicacion, id_comentador, descripcion} = req.body;
        const newComment = await comments.createComment({id_publicacion: id_publicacion, id_comentador: id_comentador, descripcion: descripcion});
        res.status(201).json(newComment);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
async function getAllComments(req, res){
    try{
        
        const {id_publicacion} = req.body;
        const comentarios = await comments.getComments(id_publicacion);
        res.status(200).json(comentarios);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


module.exports = {  
    createComment,
    getAllComments
  };