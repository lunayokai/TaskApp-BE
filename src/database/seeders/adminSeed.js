const bcrypt = require('bcryptjs');
const pool = require('../config/connection');
require('dotenv').config();

const seedAdmin = async () => {
  try {

    const adminName = process.env.ADMIN_NAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminName || !adminPassword) {
      console.error('Faltan las variables de entorno ADMIN_NAME y/o ADMIN_PASSWORD');
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const [admins] = await pool.query('SELECT * FROM admins');
    if (admins.length === 0) {
      await pool.query('INSERT INTO admins (name, hash) VALUES (?, ?)', [adminName, hashedPassword]);
      console.log('Admin sembrado exitosamente.');
    } else {
      console.log('Admin en base de datos.');
    }
  } catch (error) {
    console.error('Error al sembrar el admin:', error);
  } 
};

module.exports =  seedAdmin ;