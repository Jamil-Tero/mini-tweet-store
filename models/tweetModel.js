var mongoose = require('mongoose');
const Schema = mongoose.Schema;

 exports.tweetSchema = new Schema({
    id: {
        type: String,
        required: 'The unique identifier of the requested Tweet',
    },
    text: {
        type: String,
        required: 'The actual UTF-8 text of the Tweet'
    },
    author_id: {
        type: String,
        required: 'The unique identifier of the User who posted this Tweet.'
    },
});
const Joi = require('joi');
const joiTweetSchema = Joi.object({
    text:Joi.string().required(),
});

exports.validateTweet =(req) => {
   console.log(JSON.stringify(joiObj));
   if (joiObj.error)
        return joiObj.error
    else return 'OK';
       
}


