var express = require('express');
var Story = require('../models/story.js').Story;
var router = express.Router();


//Catch all routes and only allow user to create, edit, and finalize stories if they're signed in
router.get('/:pageCalled', function(req, res, next) {
    if(req.params.pageCalled.indexOf('favicon.ico') > -1) {
        console.log('favicon called, ignore this pos request');
    }
    else if(req.params.pageCalled.indexOf('/') > -1 || req.params.pageCalled.indexOf('/story/\w+') > -1) {
        console.log('called root or story');
        next();
    }
    else {
        if(req.session.user) {
            next();
        }
        else {
            req.session.message = 'You need to be logged in to do that';
            res.redirect('/');
        }
    }
});

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
            var message = req.session.message;
            req.session.message = null;
            res.render('index',{stories: stories, title: title, user: req.session.user, message: message});  
        });

   }else{ 
        console.log('not searching');
        Story.find(function(err, allStories) {
            if(err) return console.error(err);  
            console.log(allStories);
            stories = allStories;
            var message = req.session.message;
            req.session.message = null;
            res.render('index',{stories: stories, title: title, user: req.session.user,  message: message});   
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
router.get('/story/:story', function(req, res, next){
    Story.findOne({title : req.params.story}, function(err,story){
        res.render('story',{work:story, title:'Story', user: req.session.user});
    });
});

router.post('/create', function(req,res,next){
    var story = new Story({title: req.body.title,
    created_by: req.session.user.username,
    content: req.body.content,
    created_at: Date.now(),
    updated_at: Date.now(),
    last_update_by: req.session.user.username,
    finished: false});
    story.save(function(err,cust){
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            res.render('story',{work:story, title:story.title, user: req.session.user});
        }
            
        });
});


//Old catch all route
//// \/(\w+\/?)
//// (\w+(\/)?)+
//router.all(/(?!\s)(\w+(\/)?)+/, function(req, res, next) {
//    console.log('all route');
//    if(req.session.user) {
//        console.log('user is signed in');
//    }
//    else {
//        if(req.url.indexOf('localhost:3000') > -1 || req.url.indexOf('localhost:3000/') > -1) {
//            console.log('requesting root');
//            next();
//        }
//        console.log('user is not signed in');
////        res.redirect('/');
//    }
//    console.log('after');
//});

module.exports = router;