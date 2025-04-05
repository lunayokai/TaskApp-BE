const pool = require('../config/connection');
require('dotenv').config();

const ListModel = {
    
    createTasksTable: async () => {
        try {
            const sql = `
             CREATE TABLE IF NOT EXISTS tasks (
             id INT AUTO_INCREMENT PRIMARY KEY,
             title VARCHAR(255) NOT NULL,
             status VARCHAR(255) NOT NULL,
             description TEXT,
             completed BOOLEAN DEFAULT FALSE,
             listId INT NOT NULL,
             createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
             FOREIGN KEY (listId) REFERENCES lists(id) ON DELETE CASCADE
             )
          `;
            await pool.query(sql);
        } catch (error) {
            console.error('Error al crear la tabla "tasks":', error);
        }
    }
};

module.exports = ListModel;