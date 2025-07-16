const { tablas } = require('../models');

async function createComment(commentData) {
    const { id_publicacion, id_comentador, descripcion, archivo = null, nombre_archivo = null, tipo_archivo = null } = commentData;
    const [result] = await tablas.Comments.executeQuery(
      `INSERT INTO comentarios (id_publicacion, id_comentador, descripcion, archivo, nombre_archivo, tipo_archivo) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_publicacion, id_comentador, descripcion, archivo, nombre_archivo, tipo_archivo]
    );
    return await getComment(result.insertId);
}

async function getComments(id_publicacion) {
  const [comments] = await tablas.Comments.executeQuery(`
    SELECT 
      comentarios.id,
      comentarios.descripcion,
      comentarios.fecha,
      users.id AS id_comentador,
      users.usuario,
      users.foto
    FROM comentarios
    INNER JOIN users ON comentarios.id_comentador = users.id
    WHERE comentarios.id_publicacion = ?
    ORDER BY comentarios.fecha ASC
  `, [id_publicacion]);  
  return comments;
}

// buscar por id
async function getComment(id) {
  try {
    const [comment] = await tablas.Comments.executeQuery('SELECT * FROM comentarios WHERE id = ?', [id]);
    return comment[0];
  } catch{
    throw new Error('Error al obtener comentario por ID');
  }
}

module.exports = {
    createComment,
    getComments,
    getComment,
};
