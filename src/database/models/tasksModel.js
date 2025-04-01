const pool = require('../config/connection');
require('dotenv').config();

const environment = process.env.NODE_ENV;


const ListModel = {
    // Crear tabla de listas
    createTasksTable: async () => {
        try {
            if (environment === 'development') {
                await pool.query('DROP TABLE IF EXISTS tasks');
                console.log('Tabla "tasks" eliminada.');
            }

            const sql = `
             CREATE TABLE IF NOT EXISTS tasks (
             id INT AUTO_INCREMENT PRIMARY KEY,
             title VARCHAR(255) NOT NULL,
             description TEXT,
             completed BOOLEAN DEFAULT FALSE,
             listId INT NOT NULL,
             createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
             FOREIGN KEY (listId) REFERENCES lists(id) ON DELETE CASCADE
             )
          `;

            await pool.query(sql);
            console.log('Tabla "tasks" verificada o creada exitosamente.');

        } catch (error) {
            console.error('Error al crear la tabla "tasks":', error);
        }
    },

    create: async (name, email, password) => {
        try {
            const sql = `INSERT INTO lists (name, email, hash, status) VALUES (?, ?, ?, ?)`;
            const [result] = await pool.query(sql, [name, email, password]);
            return { id: result.insertId, name, email };
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    },

    // Obtener todos los usuarios
    getAll: async () => {
        try {
            const sql = `SELECT id, name, email, status FROM lists`;
            const [rows] = await pool.query(sql);
            return rows;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    },

    // Obtener un usuario por ID
    getById: async (id) => {
        try {
            const sql = `SELECT id, name, email FROM lists WHERE id = ?`;
            const [rows] = await pool.query(sql, [id]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw error;
        }
    },

    // Actualizar usuario
    update: async (id, name, email, password) => {
        try {
            const sql = `UPDATE lists SET name = ?, email = ?, password = ? WHERE id = ?`;
            await pool.query(sql, [name, email, password, id]);
            return { id, name, email };
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw error;
        }
    },

    // Desactivar usuario (soft delete)
    deactivate: async (id) => {
        try {
            const sql = `UPDATE lists SET active = false WHERE id = ?`;
            await pool.query(sql, [id]);
            return { id, message: 'Usuario desactivado' };
        } catch (error) {
            console.error('Error al desactivar usuario:', error);
            throw error;
        }
    }
};

module.exports = ListModel;