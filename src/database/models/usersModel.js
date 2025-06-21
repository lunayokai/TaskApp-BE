const pool = require('../config/connection');
require('dotenv').config();

const UserModel = {
  
  createUsersTable: async () => {
    try {
      const sql = `
            CREATE TABLE IF NOT EXISTS users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              hash VARCHAR(255) NOT NULL,
              status ENUM('inactive', 'active', 'blocked') NOT NULL DEFAULT 'inactive',
             createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
          `;
      await pool.query(sql);
    } catch (error) {
      console.error('Error al crear la tabla "users":', error);
    }
  }
};

module.exports = UserModel;