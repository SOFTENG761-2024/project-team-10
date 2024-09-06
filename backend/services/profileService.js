const profileDao = require("../daos/profileDao.js");
const userService = require("../services/userService.js");
const logger = require("../utils/logger.js");

async function createProfile(profileDto) {
  if (!(await userService.getUserByIdV2(profileDto.userId))) {
    await userService.createUserV2({ userId: profileDto.userId });
  }

  const existingProfile = await getProfileByUserId(profileDto.userId);
  if (existingProfile) {
    throw new Error(
      `ProfileId = ${existingProfile.id} for userId = ${profileDto.userId} already exist`
    );
  }
  logger.info(
    `userId = ${profileDto.userId} exists. Creating profile for the user.`
  );

  const profile = await profileDao.createProfile(profileDto);

  logger.info(`Created profile: ${JSON.stringify(profile)}`);
  return profile;
}
async function getProfileByUserId(userId) {
  logger.info(`Getting profile by userId: ${userId}`);
  const profile = await profileDao.getProfileByUserId(userId);
  return profile;
}

async function getProfileByBio(bio) {
  logger.info(`Getting profile by Bio: ${bio}`);
  const profile = await profileDao.getProfileByBio(bio);
  return profile;
}
module.exports = {
  createProfile,
  getProfileByUserId,
  getProfileByBio,
};
