const express = require('express');
const router = express.Router();

const {
    changeUsername
} = require('../controllers/userProfile');

const {
    verifyId
} = require('../utils/coreHelper');



router.get('/user/profile', verifyId, changeUsername);

module.exports = router;