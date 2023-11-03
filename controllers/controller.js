const db = require("../services/service");

const ShortUrl = require("../models/ShortUrl");
const User = require("../models/User");

const healthz = async (req, res) => {

    if (Object.keys(req.query).length > 0 || req.headers["content-length"] > 0) {
        return res.status(400).end();
    }
    
    db.authenticate()
    .then(() => {
        res.status(200).set("Cache-Control", "no-cache").end();
    })
    .catch((error) => {
        res.status(503).set("Cache-Control", "no-cache").end();
    });
}


module.exports = {
    healthz
}