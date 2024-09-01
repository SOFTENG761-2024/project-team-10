const { prismaClient, disconnect } = require("../daos/prismaClient");

//Create user profile - add university if it doesn't exist - would not work for now though
//TODO: move to separate objects, add logic for faculty/organization -HI
async function createUserProfile(userProfileData) {
  try {
    /* USE STATIC DATA FOR INSTITUTION
    let institution = await getInstitutionByName(userProfileData.institution_name);
    if(!institution)
      {
        console.log("Creating institute");
        institution = await addInstitution(userProfileData.institution_name);
      } 
      
    userProfileData.institution_id=institution.institution_id;
    delete userProfileData.institution_name;  */

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
  try
  {
    const institute= await prismaClient.institution.create({
      data: {
        name: institutionName,
      },
    });
    return institute;
  }

  finally {
    disconnect();
  }
}

// async function getInstitutionByName(institutionName) {
//   try {

//     const institution = await prismaClient.institution.findFirst({
//       where: {
//         name: {
//           equals: institutionName,
//           mode: 'insensitive'
//         }
//       },
//     });

//     return institution;
//   }
//   finally {
//     await disconnect();
//   }
// }


async function getUserProfileById(userId) {
  try {
    const userProfile = await prismaClient.user_profile.findFirst({
      where: {
        id: userId,
      },
    });
    return userProfile;
  }
  finally {
    await disconnect();
  }
}

async function getUserProfileByPrimaryEmail(primaryEmail) {
  try {
  
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
