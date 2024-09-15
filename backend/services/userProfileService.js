const userProfileDao = require("../daos/userProfileDao.js");
const logger = require("../utils/logger.js");


//Create user profile 
async function createUserProfile(userProfileObject) {

  const existingUserProfile = await userProfileDao.getUserProfileByPrimaryEmail(userProfileObject.primary_email);
  if (existingUserProfile) {
    throw new Error(
      `User already exists.`
    );
  }
  logger.info(
    `Creeating user for email address ${userProfileObject.primary_email}.`
  );

  const userProfile = await userProfileDao.createUserProfile(userProfileObject,);

  logger.info(`Created profile: ${JSON.stringify(userProfile)}`);
  return userProfile;
}

async function getUserProfileByPrimaryEmail(primaryEmail) {
  logger.info(`Getting user profile for "Fellows" by email: ${primaryEmail}`);
  const userProfile = await userProfileDao.getUserProfileByPrimaryEmail(primaryEmail);
  return userProfile;
}

//Get user profile by Id
async function getUserProfileById(userId) {
  logger.info(`Getting user profile for "Fellows" by userId: ${userId}`);
  const userProfile = await userProfileDao.getUserProfileById(userId);
  return userProfile;
}

async function getAllUserProfiles() {
  logger.info('Getting all user profiles');
  const userProfiles = await userProfileDao.getAllUserProfiles();
  return userProfiles;
}

async function updateUserProfileById(id, userProfileObject) {
  if (id == undefined || id == null) {
    throw new Error(
      `User Profile id is required.`
    );
  }
  let pid = parseInt(id);
  if (!(await getUserProfileById(pid))) {
    throw new Error(
      `User Profile with id ${id} does not exist.`
    );
  }
  userProfileObject.id = pid;
  logger.info(`Updating user profile for id ${id}.`);
  const userProfile = await userProfileDao.updateUserProfile(userProfileObject);
  return userProfile;
}

async function updateUserProfile(userProfileObject) {
  if (userProfileObject.id == undefined || userProfileObject.id == null) {
    throw new Error(
      `User Profile id is required.`
    );
  }
  if (!(await getUserProfileById(parseInt(userProfileObject.id)))) {
    throw new Error(
      `User Profile with id  ${userProfileObject.id} does not exist.`
    );
  }

  logger.info(`Updating user profile for id ${userProfileObject.id}.`);
  const userProfile = await userProfileDao.updateUserProfile(userProfileObject);
  return userProfile;
}

module.exports = {
  createUserProfile,
  getUserProfileById,
  getUserProfileByPrimaryEmail,
  getAllUserProfiles,
  updateUserProfile,
  updateUserProfileById
};
