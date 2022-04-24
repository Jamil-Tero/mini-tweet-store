const { json } = require('express/lib/response');
var mongoose = require('mongoose');
var tweetModel = require('../models/tweetModel.js')
const tweets = mongoose.model('tweets', tweetModel.tweetSchema);
 exports.addTweet = (req, res) => {
    let newTweet = new tweets(req.body);
    newTweet.save((err, tweet) => {
        if (err) {
            res.send(err);
        }
        res.json(tweet);
    });
}

exports.addTweets = async (mytweets) => {
   
    tweets.collection.insertMany(mytweets).then(function(){
        console.log("Data inserted")  // Success
    }).catch(function(error){
        console.log(error)      // Failure
    });
}

 exports.getTweets =  (req, res) => {
    tweets.find({}, (err, tweet) => {
        if (err) {
            console.log(`error: ${err}`);
            res.send(err);
        } else {
            res.json(tweet);
        }
    });
}


exports.getTweetWithID = (req, res) => {
    tweets.find({id:req.params.tweetID}, (err, tweet) => {
        if (err) {
            res.send(err);
        }
        res.json(tweet);
    });
}

exports.updateTweet = (req, res) => {
    // var updatedTweet={id:req.params.tweetID,text:req.body.text,author_id:res.twitterUserId};
    // console.log(JSON.stringify(updatedTweet));
    console.log(`id: ${req.params.tweetID}, text: ${JSON.stringify(req.body)},author_id:${res.twitterUserId}`);
    tweets.findOneAndUpdate({ id: req.params.tweetID}, req.body, { new: true, useFindAndModify: false }, (err, tweet) => {
        if (err) {
            res.send(err);
        }
        res.json(tweet);
    });
}

exports.deleteTweet = (req, res) => {
    tweets.deleteOne({ id: req.params.tweetID}, (err, tweet) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'successfuly deleted tweet'});
    });
}
