const pool = require('../config/connection');
require('dotenv').config();

const createAdminsTable = async () => {
    try {
        const sql = `
          CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            hash VARCHAR(255) NOT NULL,
             createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )
        `;
        await pool.query(sql);         
    } catch (error) {
        console.error('Error al crear la tabla "admins":', error);
    }
};

module.exports = createAdminsTable;