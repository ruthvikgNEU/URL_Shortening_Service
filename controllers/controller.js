const db = require("../services/service");

const ShortUrl = require("../models/ShortUrl");
const User = require("../models/User");
const bcrypt = require('bcrypt');

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

const addUser = async (req, res) => {
    // checks if request body exists, if not returns a bad request
  
    if(Object.keys(req.body).length === 0){
        return res.status(400).send('Bad request')
    }

    // if any of the required fields are empty, return a bad request
    if(req.body.first_name == null || req.body.last_name == null || req.body.username == null || req.body.password == null){
        return res.status(400).send('Bad request')
    }

    // retrieves attribute values from request body
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var username = req.body.username
    var password = req.body.password
    var dateObj = new Date()
    var date = dateObj.toJSON()

    // regex to check for valid username (email)
    var usernameCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var checkIfExists = await User.findOne({where: { username: username }})
    if(checkIfExists != null){
        return res.status(400).send('Username already exists')
    }

    // hash the user password with a salt value of 10
    var hash = await bcrypt.hash(password, 10)

    console.log(username.match(usernameCheck))
    console.log(checkIfExists)
    // if username does not exist and all entered values are valid, a new user is created and their details are returned with the corresponding status code
    if(checkIfExists == null && username.match(usernameCheck)){
        // create user info to store into database
        let userInfo = {
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: hash,
            account_created: date,
            account_updated: date
        }

        // creates new user and returns select details
        await User.create(userInfo)
        // finds newly created user to fetch info
        let response = await User.findOne({where: { username: username },
            attributes: { exclude: [ 'password', 'createdAt', 'updatedAt' ]}})  
            
        return res.status(201).send(response)
    }

    // if above checks fail, a bad request is returned
   
    return res.status(400).send('User Not Created')
}

const addUrl = async (req, res) => {


}


module.exports = {
    healthz,addUser
}