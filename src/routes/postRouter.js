const { Router } = require('express');
const router = Router();

const postController = require('../controllers/postController');

router.get('/list', postController.all);
router.post('/create', postController.create);

module.exports = router;
