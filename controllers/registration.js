var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user.js').User;
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = generateNewHash(req.body.password);
    var userToSave = new User({ username: username, password: password });
    
    userToSave.save(function(err) {
        if(err) {
            console.log(err);
            res.redirect('/');
        }
        else {
            console.log('user successfully registered with _id: ' + userToSave._id);
            res.redirect('/');
        }
    });
});


var generateNewHash = function(passwordToHash) {
    return bcrypt.hashSync(passwordToHash);
}

module.exports = router;