const { body } = require("express-validator");

module.exports = [
    body("name")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 6, max: 15 }).withMessage('El Nombre debe tener entre 6 y 15 caracteres'),
    body('email')
        .exists().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('El email tiene un formato incorrecto'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6, max: 15 }).withMessage('La contraseña debe tener entre 6 y 15 caracteres'),

    body('password2')
        .notEmpty().withMessage('Debes confirmar tu contraseña')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
];