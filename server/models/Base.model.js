const { pool } = require('../config/database'); // Asegúrate de que esté correctamente importado

class BaseModel {
  static async createTable() {
    if (!this.tableName || !this.tableDefinition) {
      throw new Error('El modelo debe definir tableName y tableDefinition');
    }

    const query = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        ${this.tableDefinition}
      )
    `;

    await pool.query(query);
    console.log(`Tabla ${this.tableName} creada/verificada`);
  }

  static async executeQuery(sql, params = []) {
    const conn = await pool.getConnection(); 
    try {
      const result = await conn.query(sql, params);
      return result;
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = BaseModel;

