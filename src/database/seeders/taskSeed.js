const bcrypt = require('bcryptjs');
const pool = require('../config/connection');
require('dotenv').config();

const seedTask = async () => {
  try {
    const title = "primer tarea";
    const description = "Descripcion detallada de primer terea";
    const completed = false;
    const listId = 1;
;

    const [tasks] = await pool.query('SELECT * FROM tasks');

    if (tasks.length === 0) {
      await pool.query(
        'INSERT INTO tasks (title, description, completed, listId) VALUES (?, ?, ?, ?)', 
        [title, description, completed, listId]
      );
      console.log('Tarea sembrada exitosamente.');
    } else {
      console.log('ℹYa existe una o mas tareas en la base de datos.');
    }
  } catch (error) {
    console.error('Error al sembrar la tarea:', error);
  }
};

module.exports = seedTask;