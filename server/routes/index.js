const express = require('express');
let router = express.Router();

router.use('/session',require('../controllers/session'));
router.use('/users',require('../controllers/users'));
module.exports=router;