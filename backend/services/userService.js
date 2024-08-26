const userDao = require("../daos/userDao.js");
const logger = require("../utils/logger.js");

async function createUser({ userName, email, userId, imageUrl }) {
  const user = await userDao.createUser({ userName, email, userId, imageUrl });

  logger.info(`Created user: ${JSON.stringify(user)}`);
  return user;
}

async function createUserV2(userDto) {
  logger.info(`V2 Creating user: ${JSON.stringify(userDto)}`);
  const user = await userDao.createUserV2(userDto);
  logger.info(`V2 Created user: ${JSON.stringify(user)}`);

  return user;
}

async function getUserById(userId) {
  logger.info(`Getting user by userId=${userId}`);
  const user = await userDao.getUserById(userId);

  return user;
}

async function getUserByIdV2(userId) {
  logger.info(`V2 Getting user by userId=${userId}`);
  const user = await userDao.getUserByIdV2(userId);

  return user;
}
module.exports = {
  createUser,
  getUserById,
  getUserByIdV2,
  createUserV2,
};
