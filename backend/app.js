var express = require("express");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const cors = require("cors");
const logger = require("./utils/logger.js");

var userController = require("./controllers/userController");
var commentController = require("./controllers/commentController");
var profileController = require("./controllers/profileController");
var userProfileController =require("./controllers/userProfileController.js");

const { connect } = require("./daos/mongodbClient");
const swaggerController = require("./controllers/swaggerController");

var app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


// Setup connection pool of mongoose.
connect().then(() => {
  logger.info("Mongodb connection pool created.");

  app.use("/api/users", userController);
  app.use("/api/comments", commentController);
  app.use("/api/profiles", profileController);
  app.use("/api/userprofile", userProfileController);
  app.use("/api/linkedIn", linkedInController);

  // setup swagger ui
  swaggerController(app);

  logger.info("server started successfully.");
});

module.exports = app;
