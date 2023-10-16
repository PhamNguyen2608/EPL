const express = require('express');
const { getUserList } = require('../controllers/userController');

const router = express.Router();

router.get('/users', getUserList);

module.exports = router;
