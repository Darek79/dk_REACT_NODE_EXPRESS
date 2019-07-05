const passport = require('passport');
const {
    Strategy
} = require('passport-google-oauth20');
const mongoose = require("mongoose");
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user=>{
        done(null,user);
    })
});


passport.use(new Strategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientKey,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    const {
        id,
        displayName,
        emails: [{
            value
        }]
    } = profile;

    User.findOne({
            googleId: id
        })
        .then((exUser) => {
            if (exUser) {
                done(null, exUser);
            } else {


                new User({
                        googleId: id,
                        gDisplayName: displayName,
                        gEmails: value
                    })
                    .save()
                    .then((user) => done(null, user));
            }
        })

}))