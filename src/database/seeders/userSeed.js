const bcrypt = require('bcryptjs');
const pool = require('../config/connection');
require('dotenv').config();

const seedUser = async () => {
  try {
    const userName = "User";
    const userPassword = "Test123";
    const userEmail = "lunalisarazo@gmail.com";
    const userStatus = "active"; 

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Verificar si ya existe un usuario en la base de datos
    const [users] = await pool.query('SELECT 1 FROM users LIMIT 1');

    if (users.length === 0) {
      await pool.query(
        'INSERT INTO users (name, hash, email, status) VALUES (?, ?, ?, ?)', 
        [userName, hashedPassword, userEmail, userStatus]
      );
      console.log('User sembrado exitosamente.');
    } else {
      console.log('ℹYa existe un user en la base de datos.');
    }
  } catch (error) {
    console.error('Error al sembrar el user:', error);
  }
};

module.exports = seedUser;