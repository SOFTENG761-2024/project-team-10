const { prismaClient, disconnect } = require("../daos/prismaClient");

async function createProfile(profileData) {
  try {
    console.log(profileData);
    const profile = await prismaClient.profile.create({
      data: profileData,
    });

    return profile;
  } finally {
    disconnect();
  }
}

async function getProfileByUserId(userId) {
  try {
    const profile = await prismaClient.profile.findFirst({
      where: {
        userId: userId,
      },
    });
    return profile;
  } finally {
    await disconnect();
  }
}

async function getProfileByBio(bio)
{
  console.log("bio");
  try {
    const profile = await prismaClient.profile.findFirst({
      where: {
        bio: {
          contains: bio,
          mode: 'insensitive' // Case-insensitive search
        }
      }
    });
    return profile;
  }
   finally {
    await disconnect();
  }
}

module.exports = { createProfile, getProfileByUserId, getProfileByBio };
