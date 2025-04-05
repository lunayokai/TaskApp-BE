const pool = require('../config/connection');
require('dotenv').config();


const ListModel = {
    
    createListsTable: async () => {
        try {

            const sql = `
            CREATE TABLE IF NOT EXISTS lists (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            userId INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )
          `;

            await pool.query(sql);
        } catch (error) {
            console.error('Error al crear la tabla "lists":', error);
        }
    },
};

module.exports = ListModel;