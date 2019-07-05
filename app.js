require("dotenv").config()

const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const express = require("express");

mongoose.connect("mongodb://localhost/dk_db", 
{useNewUrlParser: true});

require("./models/user");
require("./services/passport");

const app = express();


app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 *1000,
        keys: [process.env.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./controller/googleAuth')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);