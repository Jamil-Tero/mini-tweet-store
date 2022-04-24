var express = require('express');
var router = express.Router();
var tweetApi=require('../controllers/tweetApi');
var tokenContainer = require('../controllers/jwtContainer');
var tweetController = require('../controllers/tweetControllers.js');

router.get('/'
,function(req, res, next) {tokenContainer.authenticate(req, res, next);}
, async function(req, res, next) {
    var tweets =await tweetApi.getTweets(res.twitterUserId);
    if (tweets && tweets.length>0){
       tweets=  tweets.map(tweet => ({ ...tweet, author_id: res.twitterUserId }))
    }
    await tweetController.addTweets(tweets);
    res.send('sync successful!');
  });

module.exports = router;
