const BaseModel = require('./Base.model');

class User extends BaseModel {
  static tableName = 'users';
  static tableDefinition = `
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    foto LONGBLOB,
    biografia TEXT,
    institucion VARCHAR(100),
    escuela_profesional VARCHAR(100),
    facultad VARCHAR(100),
    siguiendo JSON DEFAULT '[]',
    seguidos JSON DEFAULT '[]',
    tipo_usuario ENUM('I', 'E', 'A') NOT NULL DEFAULT 'I',
    estado_cuenta VARCHAR(50) DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  `;
}

User.createTable();
module.exports = User;