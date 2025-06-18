const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { TokenExpiredError } = jwt;

const {
  createUser,
  destroyUserById,
  editUserById,
  getUserByPassword,
  getUserByToken,
  logoutUser,
  loginProccess,
  confirmUser,
} = require("../../services/api/usersServices.js");
const { validationResult } = require("express-validator");
const transporter = require("../../mails/config/nodemailer.js");

const tokenPassword = process.env.TOKEN_PASSWORD;
const { registerTemplate } = require("../../mails/models/notification.confirmation.js");

module.exports = {
  registerUser: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {

      user = await createUser(name, email, password);
      const response = {
        status: 201,
        user,
      };

      return res.status(response.status).json(response);
    } catch (error) {
      console.error(error);
      const status = error.status || 500;
      const message = error.message || "Hubo un error en la petición POST";
      return res.status(status).json({
        ok: false,
        error: {
          status,
          message,
        },
      });
    }
  },
  confirmRegister: async (req, res) => {
    const { token } = req.params;
    try {      
      await confirmUser(token)
 // Configurar el link para el front. cuando este el front.
      res.redirect("https://taskapp-be.onrender.com");

    } catch (error) {
      if (error instanceof TokenExpiredError) {
        
        const htmlToSend = registerTemplate(
          "Token caducado, intente recuperar contraseña.",
          "Ingresa al siguiente link para recuperar tu contraseña: ",
          `https://taskapp-be.onrender.com`
        );

        return res.status(400).send(htmlToSend);
      }
      console.error("Error al confirmar el registro:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  getUsers: async (req, res) => {
    try {
    } catch (error) {
    }
  },
  
loginUser: async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginProccess(email, password);
    return res.status(result.status).json({
      token: result.token,
      user: result.user,
    });

    
  } catch (error) {
    console.error("Error en loginUser:", error);
    const status = error.status || 500;
    const message = error.message || "Error al iniciar sesión";
    return res.status(status).json({ error: message });
  }
},
  getLogout: async (req, res) => {
    try {
    } catch (error) {
    }
  },
  deleteUser: async (req, res) => {
    try {
    } catch (error) {
    }
  },
  editUser: async (req, res) => {
    const {id} = req.params;
    const {
      name,
      email,
      password,
      confirmation,
    } = req.body;

   const updatedUser = await editUserById(id, name, email,password, confirmation)


    try {

    } catch (error) {
    }
  },
  userActivation: async (req, res) => {
    try {
    } catch (error) {
    }
  },
};
