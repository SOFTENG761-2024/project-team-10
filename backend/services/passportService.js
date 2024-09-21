const passport = require('passport');
const linkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const path = require('path');
const env = require('dotenv');
const linkedinOpenIdStrategy = require("../services/linkedinOpenIdStrategy");
const { getUserProfileById, getUserProfileByPrimaryEmail } = require('./userProfileService');
const LocalStrategy = require('passport-local').Strategy;
const passwordService = require('./passwordService');

env.config({ path: path.resolve(__dirname, '../.env') });

passport.serializeUser((user, done) => {
    console.log("serialized user: ", user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    getUserProfileById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new linkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.BACKEND_API_BASE_URL + process.env.LINKEDIN_REDIRECT_URI,
    scope: ['email', 'profile', 'openid'],
}, function (done) {
    console.log("linkedin startegy done: ", done);
}));


passport.use(new linkedinOpenIdStrategy({
}, function (user, done) {
    try {
        return done(null, done);
        // if (currentUser.is_verified) {
        //     res.redirect(process.env.FRONT_END_BASE_URL);
        // } else {
        //     console.log("User not verified");
        //     res.redirect(process.env.FRONT_END_BASE_URL + "/account-screen");
        // }

    } catch (error) {
        console.error("Error:", error);
    }
}));

// Define authenticateUser function
const authenticateUser = async (email, password, done) => {
    try {
        const user = await getUserProfileByPrimaryEmail(email);
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        const isValid = await passwordService.comparePassword(password, user.password); // Compare hashed passwords
        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    } catch (err) {
        return done(err);
    }
};


passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));


module.exports = passport;