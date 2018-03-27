const GoogleStrategy = require('passport-google-oauth20');
const user = require('./schema');
const configAuth = require('./auth');
const passport = require('passport');
const userapi = require('./api.js');

passport.serializeUser((user, done) => {
    console.log('user serialized', user._id);
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    console.log('asdf', id)
    user.findById(id)
        .then((user) => {
            console.log('user deserialized', user);
            done(null, user);
        });
});

passport.use(new GoogleStrategy({

    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL

}, async function(accessToken, refreshToken, profile, done) {
    console.log("profile passport ", profile);

    let data = {
        emailid: profile.emails[0].value,
        sex: profile.gender,
        fname: profile.name.givenName,
        lname: profile.name.familyName,
        username: profile.emails[0].value.slice(0, -10),
        verified: true,
    }

    try {
        let create = await userapi.createUser(data);
        done(null, create);
    } catch (e) {
        console.log('error in passport catch');
        let find = await userapi.findUser({ emailid: data.emailid })
        done(null, find[0]);
    }
}));

module.exports = passport;