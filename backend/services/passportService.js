const passport = require('passport');
const linkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const { getUserProfileByPrimaryEmail } = require("../daos/userProfileDao");
const path = require('path');
const env = require('dotenv');
env.config({ path: path.resolve(__dirname, '../.env') });

passport.deserializeUser((email, done) => {
    getUserProfileByPrimaryEmail(email).then((user) => {
        done(null, user);
    });
});

passport.use(new linkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/linkedin/redirect",
    scope: ['email','profile','openid'],
}, function(accessToken, refreshToken, profile, done) {
    //passport call back function
    console.log('passport fucntion fired');
    console.log(accessToken);
}));