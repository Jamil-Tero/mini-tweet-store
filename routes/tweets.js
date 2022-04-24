var express = require('express');
var router = express.Router();
var tweetController = require('../controllers/tweetControllers.js');
var tokenContainer = require('../controllers/jwtContainer');



router.get('/'
,function(req, res, next) {tokenContainer.authenticate(req, res, next);}
, function(req, res, next) {
    tweetController.getTweets(req, res);
    //res.send('get request successful!');
  });

router.get('/:tweetID'
,function(req, res, next) {tokenContainer.authenticate(req, res, next);}
, function(req, res, next) {
    tweetController.getTweetWithID(req,res);
});

router.post('/'
,function(req, res, next) {tokenContainer.authenticate(req, res, next);}
,function(req, res, next) {
    tweetController.addTweet(req, res);
});

router.put('/:tweetID'
,function(req, res, next) {tokenContainer.authenticate(req, res, next);}
, function(req, res, next) {
    tweetController.updateTweet(req,res);
});

router.delete('/:tweetID'
,function(req, res, next) {tokenContainer.authenticate(req, res, next);}
, function(req, res, next) {
    tweetController.deleteTweet(req,res);
});


module.exports = router;
