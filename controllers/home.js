var express = require('express');
var Story = require('../models/story.js').Story;
var router = express.Router();

router.get('/', function(req, res, next) {
    Story.find(function(err, allStories) {
        if(err) return console.error(err);  
        console.log('All stories: ' + allStories);
        title = 'All Stories';
        stories = allStories;
        res.render('index',{stories: stories, title: title, user: req.session.user});   
    });
//    res.send('welcome');
});

module.exports = router;