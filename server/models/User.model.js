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
  static async findAll() {
    return this.executeQuery('SELECT * FROM users');
  }
  // buscar por id
  static async findById(id) {
    return this.executeQuery('SELECT * FROM users WHERE id = ?', [id]);
  }
  // buscar por correo
  static async findByEmail(correo) {
    return this.executeQuery('SELECT * FROM users WHERE correo = ?', [correo]);
  }

  // Insertar
  static async createUser(usuario, correo, password, foto = null, biografia = null, institucion = null, escuela_profesional = null, facultad = null) {
    const result = await this.executeQuery(
      `INSERT INTO users (usuario, correo, password, foto, biografia, institucion, escuela_profesional, facultad)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [usuario, correo, password, foto, biografia, institucion, escuela_profesional, facultad]
    );
    return this.findById(result.insertId);
  }

  // Eliminar un usuario
  static async deleteUser(id) {
    const result = await this.executeQuery('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  // Actualizar
  static async updateProfile(correo, updateData) {
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(updateData)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    values.push(correo);

    const [result] = await this.executeQuery(
      `UPDATE users SET ${fields.join(', ')} WHERE correo = ?`,
      values
    );
    return result.affectedRows > 0 ? await this.findByEmail(correo) : null;
  }

}

User.createTable();
module.exports = User;