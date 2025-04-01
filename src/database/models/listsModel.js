const pool = require('../config/connection');
require('dotenv').config();

const environment = process.env.NODE_ENV;


const ListModel = {
    // Crear tabla de listas
    createListsTable: async () => {
        try {
            if (environment === 'development') {
                await pool.query('DROP TABLE IF EXISTS tasks');
                await pool.query('DROP TABLE IF EXISTS lists');
                console.log('Tabla "lists" eliminada.');
            }

            const sql = `
           CREATE TABLE IF NOT EXISTS lists (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            userId INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
          )
          `;

            await pool.query(sql);
            console.log('Tabla "lists" verificada o creada exitosamente.');

        } catch (error) {
            console.error('Error al crear la tabla "lists":', error);
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