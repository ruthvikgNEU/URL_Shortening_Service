const db = require("../services/service");
const crypto = require('crypto');
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



function hashString(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
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


var userId = -1;
async function authenticate (req) {
    // decodes authorization header to fetch username and password
    var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':')
    var username = credentials[0]
    var password = credentials[1]
  
      // finding the user with specified username
    let user = await User.findOne({where: { username: username }})

    //compares user id passed to that of user id found via username passed
    if(user != null){
        // compare user password with stored hash
        const authenticated = await bcrypt.compare(password, user.password)
        userId = user.id;
        return authenticated
    }
    return false
}
function isAuthDetails(req){
    var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':')
    var username = credentials[0]
    var password = credentials[1]
    if(username != '' && password != '')
    return true;
    return false;
}
const addUrl = async (req, res) => {
    if(req.body.longUrl == null){
        return res.status(400).send('Request Body Missing Required Fields')
    }
    if(!req.get('Authorization')){
        return res.status(401).send('Select Basic Authorization')
    }
    if(!isAuthDetails(req)){
        console.log(req.get('Authorization'))
        
        return res.status(401).send('Email or Password Missing')
    }
    var authenticated4 = await authenticate(req)
    if(authenticated4 != true){
        return res.status(403).send('Invalid Username Password')
    }
    
    const hashedString = hashString(req.body.longUrl);
    var UrlCheck = await ShortUrl.findOne({where: {longUrl: req.body.longUrl}});
  
    if(UrlCheck != null){
        return res.status(400).send('Url already exists')
    }
    var limitCheck = await User.findOne({where: {id: userId}});
    if(limitCheck.max_urls == 0){
        return res.status(400).send('Max Url Limit Reached')
    }
    var user_id = userId;
    var longUrl = req.body.longUrl;
    var shortUrl = 'http://shorturl.ly/'+hashedString.substring(0, 8);
    await ShortUrl.create({user_id: user_id, longUrl: longUrl, shortUrl: shortUrl});
    User.findOne({where: {id: user_id}}).then(user => {
        user.increment('curr_urls');
        user.decrement('max_urls');
    });
    var response = await ShortUrl.findOne({where: {shortUrl: shortUrl}});
    res.status(201).send(response);
}

const getUrlsUponId = async (req, res) => {
    if(!req.get('Authorization')){
        return res.status(401).send('Select Basic Authorization')
    }
    if(!isAuthDetails(req)){
        
        return res.status(401).send('Email or Password Missing')
    }
    var authenticated4 = await authenticate(req)
    if(authenticated4 != true){
        return res.status(403).send('Invalid Username Password')
    }

const urls = await ShortUrl.findAll({where: {user_id: userId}});
res.status(200).send(urls);

}

const getAll = async (req, res) => {
var urls = await ShortUrl.findAll();
res.status(200).send(urls);

}

const getDetails =  async (req, res) => {
    if(!req.get('Authorization')){
        return res.status(401).send('Select Basic Authorization')
    }
    if(!isAuthDetails(req)){
        console.log(req.get('Authorization'))
        
        return res.status(401).send('Email or Password Missing')
    }
    var authenticated4 = await authenticate(req)
    if(authenticated4 != true){
        return res.status(403).send('Invalid Username Password')
    }
    let details = await User.findOne({where: { id: userId },
        attributes: { exclude: [ 'password' ]}})
    res.status(200).send(details);
}

module.exports = {
    healthz,addUser,addUrl,getUrlsUponId,getAll,getDetails
}