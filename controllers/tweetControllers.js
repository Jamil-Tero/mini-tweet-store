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

exports.getLatestTweet = async(author_id) => {
    var latestTweet = await tweets.findOne({author_id: author_id},'id',{sort:{id:-1}});
    if (latestTweet?.id)
        return latestTweet.id;
    else return 0;
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
    if (tweetModel.validateTweet( req.body)=='OK'){
        tweets.findOneAndUpdate({ id: req.params.tweetID}, req.body, { new: true, useFindAndModify: false }, (err, tweet) => {
        if (err) {
            res.send(err);
        }
        res.json(tweet);
        });
    } else res.send(tweetModel.validateTweet( req.body));
}

exports.deleteTweet = (req, res) => {
    tweets.deleteOne({ id: req.params.tweetID}, (err, tweet) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'successfuly deleted tweet'});
    });
}
