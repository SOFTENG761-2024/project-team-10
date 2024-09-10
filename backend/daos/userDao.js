const { prismaClient, disconnect } = require("../daos/prismaClient");

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
  getUserByIdV2,
  createUserV2,
};
