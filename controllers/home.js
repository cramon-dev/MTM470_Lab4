var express = require('express');
var router = express.Router();

storySchema = mongoose.Schema({
    title: String,
    created_by: String,
    content: String,
    created_at: Date,
    updated_at: Date,
    last_update_by: String
});
Story = mongoose.model('Story',storySchema);

router.get('/', function(req, res, next) {
    Story.find(function(err, allStories) {
        if(err) return console.error(err);  
        console.log(allStories);
        title = 'All Stories';
        stories = allStories;
        res.render('index',{stories: stories, title: title});   
    });
//    res.send('welcome');
});

router.get('/:story', function(req, res, next){
    Story.findOne({id : req.params.story}, function(err,story){
        res.render('story',{work:story, title:'Story'});
    });
});
module.exports = router;