const express = require('express');
let router = express.Router();

router.use('/session',require('../controllers/session'));
router.use('/users',require('../controllers/users'));
router.use('/products',require('../controllers/products'));
router.use('/comments',require('../controllers/comments'));
module.exports=router;