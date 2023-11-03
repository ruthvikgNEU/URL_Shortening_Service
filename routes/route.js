const express = require('express');
const router = express.Router();
const { healthz } = require('../controllers/controller');

router.get("/healthz", healthz);


module.exports = router;