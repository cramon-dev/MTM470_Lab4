var express = require('express');
var Story = require('../models/story.js').Story;
var router = express.Router();


router.get('/', function(req, res, next) {
    title = 'All Stories';

    if(req.query['search']) {
        console.log(req.query.search);
        stories = [];
        Story.find(function(err, allStories) {
            if(err) return console.error(err);  
            console.log(allStories);
            allStories.forEach(function(story) {
                if(story.title.toLowerCase().indexOf(req.query.search.toLowerCase()) != -1 || story.content.toLowerCase().indexOf(req.query.search.toLowerCase()) != -1) {
                    console.log(true)
                    stories.push(story);
                }
            });
            res.render('index',{stories: stories, title: title, user:req.session.user});  
        });

   }else{ 
        console.log('not searching');
        Story.find(function(err, allStories) {
            if(err) return console.error(err);  
            console.log(allStories);
            stories = allStories;
            res.render('index',{stories: stories, title: title, user:req.session.user});   

        });
//    res.send('welcome');
    }
});


router.post('/edit/:story', function(req, res, next){
    console.log(req.params.story);
    Story.findOne({title : req.params.story}, function(err,story){
        if(!story.finished /*&& req.session.user*/){
            var oldStory = story.content;
        story.content = oldStory + '\n' + req.body.adds;
        story.updated_at = Date.now();
        story.save(function(err,cust){
    
        });
        
    res.redirect('/');
        }
        res.redirect('/');
        });
});


router.post('/finish/:story', function(req, res, next){
    Story.findOne({title : req.params.story}, function(err,story){
        //if(req.session.user){
            story.finished = true;
        story.save(function(err,cust){
            res.redirect('/');
        });
        //}
        
    });
});
router.get('/createStory', function(req,res,next){
    console.log(req.session.user);
    //if(req.session.user){
        res.render('create');
    //}
    //res.redirect('/');
    
});
router.get('/:story', function(req, res, next){
    Story.findOne({title : req.params.story}, function(err,story){
        res.render('story',{work:story, title:'Story'});
    });
});
router.post('/create', function(req,res,next){
    var story = new Story({title: req.body.title,
    created_by: 'User',
    content: req.body.content,
    created_at: Date.now(),
    updated_at: Date.now(),
    last_update_by: 'User',
    finished: false});
    story.save(function(err,cust){
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            res.render('story',{work:story, title:story.title});
        }
            
        });
});


module.exports = router;