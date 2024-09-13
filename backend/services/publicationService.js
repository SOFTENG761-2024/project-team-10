const publicationsDao = require("../daos/publicationsDao.js");
const userProfileService = require("../services/userProfileService.js");
const logger = require("../utils/logger.js");


//Create publications for a user
async function createUserPublication(userPublicationObject) {
  var userId= userPublicationObject.userId;
  logger.info(
    `Creeating publication for ${userId}.`
  );
  var userExist = await ProfileExists(userId);
  if(!userExist)
    {
      throw new Error(
          `User does not exist.`
        );
    }
  const publication = await publicationsDao.createUserPublication(userPublicationObject);
  logger.info(`Created publication: ${JSON.stringify(publication)}`);
  return publication;
}


//Get publictions by user Id
async function getPublicationsById(userId) {
  logger.info(`Getting publications by userId: ${userId}`);
  var userExist = await ProfileExists(userId);
  if(!userExist)
    {
      throw new Error(
          `User does not exist.`
        );
    }
  const publications = await publicationsDao.getUserPublicationsById(userId);
  return publications;
}

async function ProfileExists(userId)
{
    const existingUser= await userProfileService.getUserProfileById(Number(userId));
    return existingUser && existingUser.length > 0;
   
}




module.exports = {
  createUserPublication,
  getPublicationsById
};
