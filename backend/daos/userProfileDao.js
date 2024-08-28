const { prismaClient, disconnect } = require("../daos/prismaClient");

//Create user profile - add university if it doesn't exist 
//TODO: move to separate objects, add logic for faculty/organization -HI
async function createUserProfile(userProfileData) {
  try {
    console.log(userProfileData);
    const institution = await getInstitutionByName(userProfileData.institutionName)
    if(!institution)
      {
        institution = await addInstitution(userProfileData.institutionName)
      }

    const userProfile = await prismaClient.user_profile.create({
      data: userProfileData,
      institution_id: institution.institution_id
    });

    return userProfile;
  }
  catch (error) {
    console.log(error);
  } 
  finally {
    disconnect();
  }
}

async function addInstitution(institutionName)
{
  console.log(institutionName); //remove later
  try
  {
    const institute= await prismaClient.institution.create({
      data: {
        name: institutionName,
      },
    });
  }
  catch (error) {
    console.log(error);
  } 
  finally {
    disconnect();
  }
}

async function getInstitutionByName(institutionName) {
  try {
    const institution = await prismaClient.institution.findUnique({
      where: {
        name: {
          contains: institutionName,
          mode: 'insensitive'
        }
      },
    });
    return institution;
  }
  catch (error) {
    console.log(error);
  } 
  finally {
    await disconnect();
  }
}


async function getUserProfileById(userId) {
  try {
    const userProfile = await prismaClient.user_profile.findFirst({
      where: {
        id: userId,
      },
    });
    return profile;
  }
  catch (error) {
    console.log(error);
  } 
  finally {
    await disconnect();
  }
}

async function getUserProfileByPrimaryEmail(primaryEmail) {
  try {
    const profile = await prismaClient.user_profile.findUnique({
      where: {
        primary_email: {primaryEmail, mode: 'insensitive'}
      },
    });
    return profile;
  }
  catch (error) {
    console.log(error);
  } 
  finally {
    await disconnect();
  }
}

async function getAllUserProfiles()
{
    try{
        const userProfiles = await prismaClient.user_profile.findMany();
        return userProfiles;
    }
    catch (error) {
        console.log(error);
    }
        finally {
            await disconnect();
          }
}


module.exports = { createUserProfile, 
                  getUserProfileById, 
                  getAllUserProfiles,
                  getUserProfileByPrimaryEmail,
                  addInstitution };
