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

router.post('/edit', function(req, res, next){
    Story.findOne({title : 'title'}, function(err,story){
        
    var oldStory = story.content;
        console.log(req.body.adds);
        story.content = oldStory + '\n' + req.body.adds;
        story.updated_at = Date.now();
        story.save(function(err,cust){
    res.render('story',{work:story, title:'Story'});
        });
    });
     
});
router.get('/:story', function(req, res, next){
    
    Story.findOne({title : req.params.story}, function(err,story){
        res.render('story',{work:story, title:'Story'});
    });
});

module.exports = router;