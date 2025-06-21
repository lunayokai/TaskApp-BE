const { body } = require("express-validator");

module.exports = [
    body("name")
         .optional()
        .isLength({ min: 6, max: 15 }).withMessage('El Nombre debe tener entre 6 y 15 caracteres'),
    body('status')
        .exists().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('El email tiene un formato incorrecto'),
    body('userId')
        .notEmpty().withMessage('Debe pertencer a un usuario')
];