const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require('../../database/config/connection')

module.exports = {
  createList: async (name, status, userId) => {
    try {
      const sqlInsertList = `
        INSERT INTO lists (name, status, userId, createdAt, updatedAt)
        VALUES (?, ?, ?, NOW(), NOW())
      `;
      const [result] = await pool.query(sqlInsertList, [name, status, userId]);
  
      const [lists] = await pool.query(
        "SELECT id, name, status, userId, createdAt, updatedAt FROM lists WHERE id = ?",
        [result.insertId]
      );
  
      return {
        status: 201,
        list: lists[0],
      };
    } catch (error) {
      console.error("Error en createList:", error);
      throw error;
    }
  },

  editListById: async (id, name) => {
    try {
      const [lists] = await pool.query("SELECT * FROM lists WHERE id = ?", [id]);
      
      
      if (lists.length === 0) {
        throw { status: 404, message: "Lista no encontrada" };
      }
      const list  = lists[0];

      if (list.status === 'inactive') {
        throw { status: 401, message: "Comentario inactivo" };
      }

      if (list.status === 'blocked') {
        throw { status: 404, message: "Comentario bloqueado" };
      }

      const status = list.status
      const userId = list.userId

      await pool.query(
        "UPDATE lists SET name = ?, status = ?, userId = ?, updatedAt = NOW() WHERE id = ?",
        [name, status, userId]
      );

      return {
        status: 200,
        message: "Lista actualizada correctamente",
        user: {
          id,
          name,
          email,
          status
        }
      };
    } catch (error) {
      console.error("Error en editUserById:", error);
      throw error.status ? error : { status: 500, message: "Error en el servidor" };
    }
  },

  destroyUserById: async (req, res) => {
    try {
    } catch (error) {
    }
  },
  editUserById: async (id, name, email, password, confirmation) => {
    try {
      const [users] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      const [existingUser] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
      
      if (existingUser.length > 0) {
        throw { status: 400, message: "El email ya está registrado" };
      }

      const user = users[0];

      if (user.length === 0) {
        throw { status: 404, message: "Usuario no encontrado" };
      }
      const status = user.status;

      if (user.status === 'inactive') {
        throw { status: 401, message: "Usuario inactivo" };
      }

      if (user.status === 'blocked') {
        throw { status: 404, message: "Este usuario esta bloqueado" };
      }

      const passwordMatch = await bcryptjs.compare(confirmation, user.hash);
      if (!passwordMatch) {
        throw { status: 401, message: "Contraseña actual incorrecta" };
      }

      const newHashedPassword = await bcryptjs.hash(password, 12);

      await pool.query(
        "UPDATE users SET name = ?, email = ?, hash = ?, updatedAt = NOW() WHERE id = ?",
        [name, email, newHashedPassword, id]
      );

      return {
        status: 200,
        message: "Usuario actualizado correctamente",
        user: {
          id,
          name,
          email,
          status
        }
      };
    } catch (error) {
      console.error("Error en editUserById:", error);
      throw error.status ? error : { status: 500, message: "Error en el servidor" };
    }
  },

  getUserByPassword: async (req, res) => {
    try {
    } catch (error) {
    }
  },
  getUserByToken: async (req, res) => {
    try {
    } catch (error) {
    }
  },
  loginProccess: async (email, password) => {
    try {
      const [users] = await pool.query(
        "SELECT id, email, hash, status FROM users WHERE email = ?",
        [email]
      );

      if (users.length === 0) {
        throw { status: 401, message: "Credenciales incorrectas" };
      }

      const user = users[0];

      const passwordMatch = await bcryptjs.compare(password, user.hash);

      if (!passwordMatch) {
        throw { status: 401, message: "Credenciales incorrectas" };
      }
      const status = user.status

      if (status === "inactive") {
        throw { status: 401, message: "Usuario inactivo" };
      }
      if (status === "blocked") {
        throw { status: 401, message: "Usuario bloqueado" };
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.TOKEN_PASSWORD,
        { expiresIn: "1h" }
      );

      return {
        status: 200, token, user: {
          id: user.id,
          email: user.email,
          name: user.name,
          status: user.status
        }
      };
    } catch (error) {
      console.error("Error en loginProcess:", error);
      throw error.status ? error : { status: 500, message: "Error en el servidor" };
    }
  },
  logoutUser: async (req, res) => {
    try {
    } catch (error) {
    }
  },
  deactivate: async (id) => {
    try {
      const sql = `UPDATE users SET status = inactive WHERE id = ?`;
      await pool.query(sql, [id]);
      return { id, message: 'Usuario desactivado' };
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
      throw error;
    }
  },
  block: async (id) => {
    try {
      const sql = `UPDATE users SET status = blocked WHERE id = ?`;
      await pool.query(sql, [id]);
      return { id, message: 'Usuario bloquedo' };
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
      throw error;
    }
  },
  getById : async (id) =>{
    try {
      const sqlUser = 'SELECT id,name,email,status FROM users WHERE id = ?';
      const [users] = await pool.query(sqlUser,[id]);
    
      if (users.length === 0) {
        throw { status: 404, message: "Usuario no encontrado" };
      }

      const user = users[0];

      return {
        status: 200, token, user: {
          id: user.id,
          email: user.email,
          name: user.name,
          status: user.status
        }
      }; 

    } catch (error) {
      console.error('Error al buscar usuario por id:', error);
      throw error;
    }
  }
  
}