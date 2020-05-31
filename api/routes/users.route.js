var router = require('express').Router();

var userController = require('../controllers/users.controller');

router.get('/',userController.userList);
router.post('/',userController.insertUser);
router.put('/:userId',userController.updateUser);
router.delete('/:userId',userController.deleteUser);
router.get('/:userId',userController.getUserById);

module.exports = router;