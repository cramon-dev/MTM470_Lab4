var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log('destroying session');
    req.session.destroy(function(err) {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

module.exports = router;