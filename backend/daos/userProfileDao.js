const { prismaClient, disconnect } = require("../daos/prismaClient");
const USER_TYPE_ACADEMIC = 1;
const USER_TYPE_BUSINESS = 2;

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

async function addInstitution(institutionName) {
  try {
    const institute = await prismaClient.institution.create({
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


async function getUserProfileById(id) {
  try {
    const userProfile = await prismaClient.user_profile.findFirst({
      where: {
        id: parseInt(id),
      },
      include:
      {
        institution: true,
        faculty: true,
        publication: true,
      }
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
      include:
      {
        institution: true,
        faculty: true,
        publication: true,
      }
    });
    return profile;
  }

  finally {
    await disconnect();
  }
}

async function getAllUserProfiles() {
  try {
    const userProfiles = await prismaClient.user_profile.findMany();
    return userProfiles;
  }
  finally {
    await disconnect();
  }
}

async function getAllVerifiedUserProfiles(is_verified) {
  try {
    const userProfiles = await prismaClient.user_profile.findMany({
      include: {
        organization: true,
        usertype: true
      },
      where: {
        is_verified: { equals: is_verified },
        usertypeid: { equals: USER_TYPE_BUSINESS } // only business users need to be verified
      },
      orderBy: [
        {
          id: 'desc',
        },
      ],
    });
    return userProfiles;
  }
  finally {
    await disconnect();
  }
}

async function updateUserProfile(userProfileData) {
  try {
    const userProfile = await prismaClient.$transaction(async (tx) => {
      let organizationData = {};

      if (userProfileData.organization) {
        const organization = await tx.organization.upsert({
          where: {
            name: userProfileData.organization.name,
          },
          update: userProfileData.organization,
          create: userProfileData.organization,
        });

        // Prepare the nested write operation
        organizationData = {
          connect: { id: organization.id },
        };

        // Remove the organization property from userProfileData
        delete userProfileData.organization;
      }

      // Exclude 'id' from userProfileData
      const { id, ...updateData } = userProfileData;

      const updatedUserProfile = await tx.user_profile.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ...updateData,
          ...(organizationData && { organization: organizationData }),
        },
      });

      // Return the updated user profile from the transaction
      return updatedUserProfile;
    });

    // Return the user profile from the function
    return userProfile;
  } finally {
    await disconnect();
  }
}


//Update the password for the user profile - only valid for user type 2 - Business account
async function updatePassword(userId, userPassword)
{
    try
    {
        const userProfile = await prismaClient.user_profile.update(
            {
                where: {
                  id: userId,
                  usertypeid : USER_TYPE_BUSINESS,
                },
                data: 
                {
                    password:userPassword,
                    password_update_datetime: new Date(),
                }
            }
        )
        return userProfile.id;
    }

    finally {
        disconnect();
      }
}

//Search against keywords
async function searchKeywords(keywordList)
{
  try{
  const keywords = keywordList.split(' ');
  const searchConditions = keywords.map(searchTerm => ({
    OR: [
      { first_name: { contains: searchTerm, mode: 'insensitive' } },
      { last_name: { contains: searchTerm, mode: 'insensitive' } },
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { positions: { contains: searchTerm, mode: 'insensitive' } },
      { department: { contains: searchTerm, mode: 'insensitive' } },
      { research_tags: { contains: searchTerm, mode: 'insensitive' } },
      { skills: { contains: searchTerm, mode: 'insensitive' } },
      { institution: { name: { contains: searchTerm, mode: 'insensitive' } } },
      { organization: { name: { contains: searchTerm, mode: 'insensitive' } } }
    ]
  }));

  const searchResults = await prismaClient.user_profile.findMany({
    where: {
      AND: [
        ...searchConditions,  // Combine keyword search conditions
        { usertypeid: { in: [USER_TYPE_ACADEMIC, USER_TYPE_BUSINESS] } }  // Only include usertypeid for academic and business
      ],
    },
    include: {
      institution: true,
      organization: true,
    },
  });

    return searchResults;
  }

    finally {
        disconnect();
      }
    }


module.exports = {
  createUserProfile,
  getUserProfileById,
  getAllUserProfiles,
  getUserProfileByPrimaryEmail,
  addInstitution,
  updateUserProfile,
  getAllVerifiedUserProfiles,
  updatePassword,
  searchKeywords
};
