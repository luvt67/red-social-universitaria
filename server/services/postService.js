const { tablas } = require('../models');
async function createPost(id_usuario, descripcion, nombre_archivo = null, tipo_archivo = null) {
    try{
        const [result] = await tablas.Publications.executeQuery(
            `INSERT INTO publications (id_usuario, descripcion, nombre_archivo, tipo_archivo) 
            VALUES (?, ?, ?, ?)`,
            [id_usuario, descripcion, nombre_archivo, tipo_archivo]
        );
        const [newPostCreate] = await tablas.Publications.findById(result.insertId); 
        return newPostCreate[0];
    } catch(error)
    {
        throw new Error('Error creating post', error);
    }
}

async function getAllPosts() {
    try {
        const [posts] = await tablas.Publications.executeQuery('SELECT * FROM publications');
        return posts;
    } catch (error) {
        throw new Error('Error fetching posts', error);
    }
}
    
module.exports = {
    createPost,
    getAllPosts,
  };