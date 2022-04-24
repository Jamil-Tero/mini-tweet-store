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
// exports.joiTweetSchema = Joi.object({
//     id: Joi.string(),
//     text:Joi.string(),
//     author_id:Joi.string()
// });


