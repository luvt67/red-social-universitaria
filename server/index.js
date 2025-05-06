require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'red_social_universitaria_DB',
  port: process.env.DB_PORT || 3306
};

let pool;
async function initDb() {
  pool = await mysql.createPool(dbConfig);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('DB ready');
}
initDb().catch(console.error);

// Registro simple (guarda texto plano)
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos' });
  }
  try {
    await pool.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    res.status(201).json({ message: 'Registrado' });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Usuario o email ya existe' });
    }
    console.error(e);
    res.status(500).json({ error: 'Error servidor' });
  }
});

// Login simple (compara texto plano)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  

  try {
    // Buscar usuario por email en lugar de username
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    // Verificar si existe y si la contraseña coincide (en texto plano)
    if (!rows.length || rows[0].password !== password) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // Respuesta exitosa
    res.json({ 
      message: 'Autenticado', 
      user: { 
        id: rows[0].id, 
        username: rows[0].username,
        email: rows[0].email
      } 
    });

  } catch (e) {
    console.error('Error en login:', e);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.get('/api/grud', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, email, created_at FROM users'
    );
    res.json(rows);
  } catch (e) {
    console.error('Error al obtener usuarios config:', e);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// ------------------------------------------------------------------
// Actualizar usuario
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    
    // Verificar si el usuario existe
    const [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Actualizar usuario
    let query = 'UPDATE users SET username = ?, email = ?';
    let params = [username, email];
    
    if (password) {
      query += ', password = ?';
      params.push(password); // En producción, hashear la nueva contraseña
    }
    
    query += ' WHERE id = ?';
    params.push(id);
    
    await pool.execute(query, params);
    
    res.json({
      id,
      username,
      email
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar si el usuario existe
    const [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Eliminar usuario
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    
    res.json({ message: 'Usuario eliminado correctamente' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});
// ------------------------------------------------------------------


// Ejemplo de ruta protegida (sin auth real)
app.get('/api/protected', (req, res) => {
  res.json({ message: 'Ruta protegida (para pruebas)' });
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
