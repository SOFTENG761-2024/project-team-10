const userDao = require("../daos/userDao.js");
const logger = require("../utils/logger.js");

async function createUser(userDto) {
  logger.info(`Creating user: ${JSON.stringify(userDto)}`);
  const user = await userDao.createUserV2(userDto);
  logger.info(`Created user: ${JSON.stringify(user)}`);

  return user;
}

async function getUserById(userId) {
  logger.info(`Getting user by userId=${userId}`);
  const user = await userDao.getUserById(userId);

  return user;
}
module.exports = {
  getUserById,
  createUser,
};
