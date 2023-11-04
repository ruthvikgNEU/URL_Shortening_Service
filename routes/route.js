const express = require('express');
const router = express.Router();
const { healthz,addUser,addUrl,getUrlsUponId,getAll,getDetails } = require('../controllers/controller');

router.get("/healthz", healthz);
router.post("/addUser", addUser);
router.post("/addUrl", addUrl);
router.get("/getUrls", getUrlsUponId);
router.get("/getAll", getAll);
router.get("/getMyDetails", getDetails);

module.exports = router;