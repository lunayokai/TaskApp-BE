const { body } = require("express-validator");

module.exports = [
    body('email')
        .exists().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('El email tiene un formato incorrecto')
        ,

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6, max: 15 }).withMessage('La contraseña debe tener entre 6 y 15 caracteres'),

];