var express = require("express");
//var cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');
var morgan = require("morgan");
const cors = require("cors");
const logger = require("./utils/logger.js");
const passportService = require("./services/passportService.js");
const passport = require('passport');
const env = require('dotenv');
env.config();

var userController = require("./controllers/userController");
var profileController = require("./controllers/profileController");
var userProfileController = require("./controllers/userProfileController.js");
var publicationController = require("./controllers/publicationsController.js");
var authController = require('./controllers/authController.js');
var testController = require('./controllers/testController.js')
const swaggerController = require("./controllers/swaggerController");

var app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

//Encrypt the cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [env.COOKIE_KEY]
}))

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use("/api/users", userController);
app.use("/api/profiles", profileController);
app.use("/api/userprofile", userProfileController);
app.use("/api/publications", publicationController);
app.use("/api/auth", authController);
app.use("/api/test", testController);

// setup swagger ui
swaggerController(app);



logger.info("server started successfully.");

module.exports = app;
