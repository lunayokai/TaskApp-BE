const bcrypt = require('bcryptjs');
const pool = require('../config/connection');

const seedUser = async () => {
  try {
    const listTitle = "Tareas";
    const listUserId = 1;
    
    const [lists] = await pool.query('SELECT * FROM lists');
          
    if (lists.length === 0) {
      await pool.query(
        'INSERT INTO lists (name, userId) VALUES (?, ?)', 
        [listTitle, listUserId]
      );
      console.log('Lista sembrada exitosamente.');
    } else {
      console.log('ℹYa existe una lista en la base de datos.');
    }
  } catch (error) {
    console.error('Error al sembrar el lista:', error);
  }
};

module.exports = seedUser;

//test comment