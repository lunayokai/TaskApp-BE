const express = require('express');
const router = express.Router();
const {registerUser,confirmRegister, loginUser, getLogout,editUser } = require('../../controllers/api/usersApiController')
const registerValidations = require('../../validations/users/registerValidations')
const loginValidations = require('../../validations/users/loginValidations')
const editValidations = require('../../validations/users/editValidations')

router.post('/register', registerValidations, registerUser);
router.get('/confirm/:token',confirmRegister);
router.post('/login', loginValidations, loginUser);
router.put('/:id', editValidations, editUser);
router.get('/logout', getLogout);

module.exports = router;