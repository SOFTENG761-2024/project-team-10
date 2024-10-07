const { prismaClient, disconnect } = require("../daos/prismaClient");

async function createUser(userData) {
  try {
    const user = await prismaClient.user.create({
      data: { id: userData.userId },
    });

    return user;
  } finally {
    disconnect();
  }
}

async function getUserById(userId) {
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
  getUserById,
  createUser,
};
