const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getPost);
router.get('/post/:id', blogController.postDetail);
router.post('/add-comment', blogController.addComment);

module.exports = router;

