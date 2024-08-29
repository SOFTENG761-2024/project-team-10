const { prismaClient, disconnect } = require("../daos/prismaClient");

//Create user profile - add university if it doesn't exist 
//TODO: move to separate objects, add logic for faculty/organization -HI
async function createUserProfile(userProfileData) {
  try {
    console.log(userProfileData);
    const institution = await getInstitutionByName(userProfileData.institutionName);
    if(!institution)
      {
        institution = await addInstitution(userProfileData.institutionName);
        userProfile.institution_id=institution.institution_id;
      } 
    console.log(JSON.stringify(institution));
    const userProfile = await prismaClient.user_profile.create({
      data: userProfileData
    });

    return userProfile;
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

  finally {
    disconnect();
  }
}

async function getInstitutionByName(institutionName) {
  try {
    const institution = await prismaClient.institution.findFirst({
      where: {
        name: {
          contains: institutionName,
          mode: 'insensitive'
        }
      },
    });
    return institution;
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
  finally {
    await disconnect();
  }
}

async function getUserProfileByPrimaryEmail(primaryEmail) {
  try {
    console.log(primaryEmail);
    //const email= String(primaryEmail);
    const profile = await prismaClient.user_profile.findUnique({
      where: {
        primary_email: primaryEmail,
      },
    });
    return profile;
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
        finally {
            await disconnect();
          }
}


module.exports = { createUserProfile, 
                  getUserProfileById, 
                  getAllUserProfiles,
                  getUserProfileByPrimaryEmail,
                  addInstitution };
