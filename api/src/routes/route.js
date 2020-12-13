const express = require('express');
const router = express.Router();

const ExtrtCtrl = require('../controllers/extractController');

router.use('/extract', ExtrtCtrl);

module.exports = router;