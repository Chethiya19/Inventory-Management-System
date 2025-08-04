const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/counts', statsController.getCounts);

module.exports = router;
