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
}

Comment.createTable();
module.exports = Comment;
