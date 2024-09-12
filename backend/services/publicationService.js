const userProfileDao = require("../daos/publicationsDao.js");
const logger = require("../utils/logger.js");


//Create publications for a user
async function createUserPublication(userPublicationObject) {
  
  logger.info(
    `Creeating publiation for ${userPublicationObject.user_id}.`
  );

  const publication = await publicationsDao.createUserPublication(userPublicationObject);

  logger.info(`Created publication: ${JSON.stringify(publication)}`);
  return publication;
}


//Get publictions by user Id
async function getPublicationsById(userId) {
  logger.info(`Getting publications by userId: ${userId}`);
  const publications = await publicationsDao.getAllUserProfiles(userId);
  return publications;
}




module.exports = {
  createUserPublication,
  getPublicationsById
};
