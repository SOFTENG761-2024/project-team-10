const User = require("../models/user.js");
const { prismaClient, disconnect } = require("../daos/prismaClient");

async function createUser({ userName, email, userId, imageUrl }) {
  return await User.create({ userName, email, userId, imageUrl });
}

async function getUserById(userId) {
  return await User.findOne({ userId });
}

async function createUserV2(userData) {
  try {
    const user = await prismaClient.user.create({
      data: { id: userData.userId },
    });

    return user;
  } finally {
    disconnect();
  }
}

async function getUserByIdV2(userId) {
  try {
    console.log(userId);
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } finally {
    disconnect();
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByIdV2,
  createUserV2,
};
