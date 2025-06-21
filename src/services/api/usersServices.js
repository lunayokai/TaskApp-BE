const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const pool = require('../../database/config/connection')
const transporter = require("../../mails/config/nodemailer.js");
const { registerTemplate } = require("../../mails/models/notification.confirmation.js");

const generateJWT = (email) => {
  return jwt.sign({ email }, process.env.TOKEN_PASSWORD, {
    expiresIn: "1h",
  });
};

const sendConfirmationEmail = async (email, token) => {
  try {
    const urlBase = process.env.URL_BASE;
    const htmlToSend = registerTemplate(
      "Gracias por formar parte de TaskApp",
      "Tu cuenta ha sido creada con éxito. Como último paso necesitamos que confirmes tu email haciendo click en el siguiente enlace",
      `${urlBase}/api/users/confirm/${token}`
    );

    const mailOptions = {
      from: '"TaskApp" <r.lisarazo@gmail.com>',
      to: email,
      subject: "Confirmación de registro",
      html: htmlToSend,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw { status: 500, message: "Error al enviar el correo de confirmación" };
  }
};

module.exports = {
  createUser: async (name, email, password) => {
    try {
      // Verificar si el email ya está registrado
      const [existingUser] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
      if (existingUser.length > 0) {
        throw { status: 400, message: "El email ya está registrado" };
      }

      // Hashear la contraseña
      const hashedPassword = await bcryptjs.hash(password, 12);

      // Insertar usuario en la base de datos con status "inactive"
      const sqlInsertUser = `
        INSERT INTO users (name, email, hash, status, createdAt, updatedAt)
        VALUES (?, ?, ?, 'inactive', NOW(), NOW())
      `;
      const [result] = await pool.query(sqlInsertUser, [name, email, hashedPassword]);

      // Obtener el usuario recién creado
      const [newUser] = await pool.query(
        "SELECT id, name, email, status, createdAt, updatedAt FROM users WHERE id = ?",
        [result.insertId]
      );

      // Generar el token de confirmación
      const token = generateJWT(email);


      // Enviar el correo de confirmación
      await sendConfirmationEmail(email, token);

      return {
        status: 201,
        user: newUser[0],
      };
    } catch (error) {
      console.error("Error en createUser:", error);
      throw error; // Dejar que el controller lo maneje
    }
  },


  confirmUser: async (token) => {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_PASSWORD);
      const email = decoded.email;

      // Buscar usuario
      const [user] = await pool.query(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );

      if (user.length === 0) {
        throw { status: 404, message: "Usuario no encontrado" };
      }

      // Activar usuario
      await pool.query("UPDATE users SET status = 'active' WHERE email = ?", [email]);

      return { status: 200, message: "Cuenta activada exitosamente" };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw { status: 400, message: "El token ha caducado" };
      }
      console.error("Error en confirmUser:", error);
      throw { status: 500, message: "Error al confirmar el usuario" };
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