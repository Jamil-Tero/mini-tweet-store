var mongoose = require('mongoose');
module.exports = function() {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env['CONNECTION_STRING'], {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
  } catch (e){
     console.log(`err in mongo: ${e}`);
  }



};
