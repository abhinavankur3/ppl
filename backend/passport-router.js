const express = require('express');
const router = express.Router();
const passport = require('passport');
const userdb = require('./schema.js');



router.get('/google', passport.authenticate('google', {

    scope: ['profile', 'email']
}));


router.get('/google/callback',
    passport.authenticate('google'), (req, res) => {
        res.redirect('http://localhost:3000/googlelogin/' + req.user.emailid);
    });

module.exports = router;