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

var userProfileController = require("./controllers/userProfileController.js");
var publicationController = require("./controllers/publicationsController.js");
var authController = require('./controllers/authController.js');
var testController = require('./controllers/testController.js')
const swaggerController = require("./controllers/swaggerController");
var searchController = require("./controllers/searchController.js")
var tuakiriAuthController = require('./controllers/tuakiriAuthController.js');
//const { loadESLint } = require("eslint");

var app = express();

passportService;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: true,
    credentials: true
}));

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

//TODO: Commented temporarily to stop build from failing - HI

// Middleware to protect routes, check if user is authenticated and verified
// eslint-disable-next-line no-unused-vars
function ensureAuthenticated(req, res, next) {
    if (!req.isAuthenticated())
        res.status(401).json({ message: 'Unauthorized access' });
    else {
        if (req.user.is_verified)
            return next(); // Proceed to the next middleware/controller if authenticated
        else
            res.redirect(process.env.FRONT_END_BASE_URL + '/create-account'); // Redirect to screen if not verified
    }
}

// app.use("/api/userprofile", ensureAuthenticated, userProfileController);
app.use("/api/userprofile", userProfileController);
app.use("/api/publications", publicationController);
app.use("/api/auth", authController);
app.use("/api/test", testController);
app.use("/api/search", searchController);
app.use("", tuakiriAuthController);

// setup swagger ui
swaggerController(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });

logger.info("server started successfully.");

module.exports = app;
