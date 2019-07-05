require('dotenv').config()
const express = require('express');
const passport = require('passport');
const {
    Strategy
} = require('passport-google-oauth20');

const app = express();
// app.use(express.urlencoded({
//     extended: false
// }));
// app.use(express.json());

passport.use(new Strategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientKey,
    callbackURL: "/auth/google/callback"
}, (accessToken) => {
    console.log(accessToken);
}));


app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile','email']
    })
    );

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    (req, res)=> {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT);