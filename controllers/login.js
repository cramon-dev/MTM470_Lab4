var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user.js').User;
var util = require('util');
var router = express.Router();


router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    
    User.find({ username: username }, function(err, users) {
        if(!err && Object.keys(users).length > 0) {
            if(bcrypt.compareSync(password, users[0].password)) {
                req.session.user = { username: users[0].username };
            }
            
            res.redirect('/');
        }
        else {
            console.log('User not found');
            res.redirect('/');
        }
    });
});

var generateNewHash = function(passwordToHash) {
    return bcrypt.hashSync(passwordToHash);
}

module.exports = router;