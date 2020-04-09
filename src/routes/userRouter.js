const { Router } = require('express');
const router = Router();

const userController = require('../controllers/userController');

router.get('/me', userController.me);
router.delete('/delete', userController.deleteUsers);
router.get('/list', userController.all);

module.exports = router;
