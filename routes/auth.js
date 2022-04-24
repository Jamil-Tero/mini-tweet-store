var express = require('express');
var passport = require('passport');
var tokenContainer = require('../controllers/jwtContainer');

var router = express.Router();


router.get('/login',  passport.authenticate('twitter'));

router.get(process.env['callbackURL'],
  passport.authenticate('twitter', { assignProperty: 'federatedUser', failureRedirect: '/login' }),
  function(req, res, next) {

   var token= tokenContainer.generateAccessToken(req.federatedUser.id)
    tokenContainer.saveToken(req.federatedUser.id,token);
    res.json({id: req.federatedUser.id, token:token});
    
  });



module.exports = router;
