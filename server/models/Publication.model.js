const BaseModel = require('./Base.model');

class Publication extends BaseModel {
  static tableName = 'publications';
  static tableDefinition = `
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    descripcion TEXT NOT NULL,
    nombre_archivo VARCHAR(255),
    tipo_archivo ENUM('imagen', 'pdf'),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado_publicacion VARCHAR(50) DEFAULT 'publicado',
    FOREIGN KEY (id_usuario) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_usuario (id_usuario)
  `;

  static async findById(id) {
    return this.executeQuery('SELECT * FROM publications where id = ?', [id]);
  }
}

Publication.createTable();
module.exports = Publication;
