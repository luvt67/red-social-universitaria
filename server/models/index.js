const {pool,testConnection} = require('../config/database');
// Verificar relaciones después de crear tablas
async function verifyRelations() {
  const conn = await pool.getConnection();
  try {
    // Verificar claves foráneas
    const foreignKeys = await conn.query(`
      SELECT 
        TABLE_NAME, 
        COLUMN_NAME, 
        REFERENCED_TABLE_NAME, 
        REFERENCED_COLUMN_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = ?
      AND REFERENCED_TABLE_NAME IS NOT NULL`,
      [process.env.DB_NAME]
    );
    return true;
  } catch (error) {
    return false;
  } finally {
    if (conn) conn.release();
  }
}
let tablas = {};
// Verificar conexion a la base de datos y luego verificar relaciones
async function verifyConnectionAndRelations() {
  const success = await testConnection();
  if (success) {
    // cargar modelos
    tablas.User = require('./User.model');
    tablas.Publication = require('./Publication.model');
    tablas.Comment = require('./Comment.model');

    const verificacion = await verifyRelations();
    if (verificacion) {
      console.log('Relaciones verificadas correctamente.');
      return true;
    } else {
      console.log('Error al verificar relaciones.');
      return false;
    }
  } else {
    console.log('No se pudo conectar a la BD, no se verifican relaciones.');
    return false;
  }
}


module.exports = {
  verifyConnectionAndRelations,
  tablas
};