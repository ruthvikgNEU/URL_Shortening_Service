const express = require('express');
const router = express.Router();
const { healthz,addUser } = require('../controllers/controller');

router.get("/healthz", healthz);
router.post("/addUser", addUser);


module.exports = router;