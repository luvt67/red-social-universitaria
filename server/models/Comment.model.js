const BaseModel = require('./Base.model');

class Comment extends BaseModel {
  static tableName = 'comentarios';
  static tableDefinition = `
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_publicacion INT NOT NULL,
    id_comentador INT NOT NULL,
    descripcion TEXT NOT NULL,
    archivo MEDIUMBLOB NULL,
    nombre_archivo VARCHAR(255),
    tipo_archivo ENUM('imagen', 'pdf'),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado_comentario VARCHAR(50) DEFAULT 'activo',
    FOREIGN KEY (id_publicacion) REFERENCES publications(id) ON DELETE CASCADE,
    FOREIGN KEY (id_comentador) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_publicacion (id_publicacion),
    INDEX idx_comentador (id_comentador)
  `;

  static async addComment(commentData) {
    const { id_publicacion, id_comentador, descripcion, archivo = null, nombre_archivo = null, tipo_archivo = null } = commentData;
    const result = await this.executeQuery(
      `INSERT INTO comentarios (id_publicacion, id_comentador, descripcion, archivo, nombre_archivo, tipo_archivo) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_publicacion, id_comentador, descripcion, archivo, nombre_archivo, tipo_archivo]
    );
    return this.findById(result.insertId);
  }

  static async getPublicationComments(id_publicacion) {
    return this.executeQuery(
      `SELECT c.*, u.correo, u.foto 
       FROM comentarios c
       JOIN users u ON c.id_comentador = u.id
       WHERE c.id_publicacion = ?
       ORDER BY c.fecha ASC`,
      [id_publicacion]
    );
  }

  static async updateCommentStatus(id, nuevoEstado) {
    await this.executeQuery(
      'UPDATE comentarios SET estado_comentario = ? WHERE id = ?',
      [nuevoEstado, id]
    );
    return this.findById(id);
  }

  // ... otros métodos
}

Comment.createTable();
module.exports = Comment;
