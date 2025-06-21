const { body } = require("express-validator");
const pool = require('../../database/config/connection');

module.exports = [
    body("name")
    .optional()
        .isLength({ min: 6, max: 15 }).withMessage('El Nombre debe tener entre 6 y 15 caracteres'),
    body('email')
    .optional()
        .isEmail().withMessage('El email tiene un formato incorrecto'),
    body('password')
    .optional()
        .isLength({ min: 6, max: 15 }).withMessage('La contraseña debe tener entre 6 y 15 caracteres'),
    body('password2')
    .optional()
        .custom((value, { req }) => {
             if (req.body.password) {
                if (!value) {
                    throw new Error('Debes confirmar con tu contraseña actual');
                } 
            }
            return true;
        }),
];