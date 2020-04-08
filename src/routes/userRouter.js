const { Router } = require('express');
const router = Router();

const userController = require('../controllers/userController');

router.get('/me', userController.me);

module.exports = router;
