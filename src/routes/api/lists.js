const express = require('express');
const router = express.Router();
const {postList,deleteList, updateList, findList } = require('../../controllers/api/listsApiController')
const createrValidations = require('../../validations/lists/createValidations')
const updateValidations = require('../../validations/lists/updateValidations')

router.post('/create', createrValidations, postList);
router.delete('/:id',deleteList);
router.get('/find', findList);
router.put('/:id', updateValidations, updateList);
module.exports = router;