const pool = require('../config/connection');
require('dotenv').config();

const environment = process.env.NODE_ENV;

const createAdminsTable = async () => {
    try {
        if (environment === 'development') {
            await pool.query('DROP TABLE IF EXISTS admins');
            console.log('Tabla "admins" eliminada.');
        }

        const sql = `
          CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            hash VARCHAR(255) NOT NULL
          )
        `;

        await pool.query(sql);
        console.log('Tabla "admins" verificada o creada exitosamente.');

    } catch (error) {
        console.error('Error al crear la tabla "admins":', error);
    }
};

module.exports = createAdminsTable;