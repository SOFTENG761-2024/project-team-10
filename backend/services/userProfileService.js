const userProfileDao = require("../daos/userProfileDao.js");
const logger = require("../utils/logger.js");


//Create user profile 
async function createUserProfile(userProfileObject) {
    
  const existingUserProfile = await userProfileDao.getProfileByPrimaryEmail(userProfile.primary_email);
  if (existingUserProfile) {
    throw new Error(
      `User already exists.`
    );
  }
  logger.info(
    `Creeating user for email address ${userProfile.primary_email}.`
  );

  const userProfile = await userProfileDao.createUserProfile(userProfileObject, );

  logger.info(`Created profile: ${JSON.stringify(userProfile)}`);
  return userProfile;
}

//Get user profile by Id
async function getUserProfileById(userId) {
  logger.info(`Getting user profile for "Fellows" by userId: ${userId}`);
  const userProfile = await userProfileDao.getUserProfileById(userId);
  return userProfile;
}


module.exports = {
  createUserProfile,
  getUserProfileById,
};
