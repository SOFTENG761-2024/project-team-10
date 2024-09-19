var express = require("express");
const session = require('express-session');
//var cookieParser = require("cookie-parser");
// const cookieSession = require('cookie-session');
var morgan = require("morgan");
const cors = require("cors");
const logger = require("./utils/logger.js");
const passportService = require("./services/passportService.js");
const passport = require('passport');
const env = require('dotenv');
env.config();

var userController = require("./controllers/userController");
var userProfileController = require("./controllers/userProfileController.js");
var publicationController = require("./controllers/publicationsController.js");
var authController = require('./controllers/authController.js');
var testController = require('./controllers/testController.js')
const swaggerController = require("./controllers/swaggerController");

var app = express();

passportService;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//app.use(cookieParser());
//Encrypt the cookie
// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [env.COOKIE_KEY]
// }))


// Set up session middleware
app.use(session({
    secret: 'fellows-secret-key',  // Replace with a strong secret in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware to protect routes
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Proceed to the next middleware/controller if authenticated
    }
    res.status(401).json({ message: 'Unauthorized access' });
}

app.use("/api/users", userController);
app.use("/api/userprofile", ensureAuthenticated, userProfileController);
app.use("/api/publications", publicationController);
app.use("/api/auth", authController);
app.use("/api/test", testController);

// setup swagger ui
swaggerController(app);



logger.info("server started successfully.");

module.exports = app;
