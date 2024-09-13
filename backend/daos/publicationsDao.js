const { prismaClient, disconnect } = require("./prismaClient");


async function createUserPublication(userPublicationData) {
  try {
  
    const userPublication = await prismaClient.publication.create ({
      data: userPublicationData
    });

    return userPublication;
  }

  finally {
    disconnect();
  }
}



async function getUserPublicationsById(userId) {
  let userIdInt = +userId;
  try {
    const allUserPublications = await prismaClient.publication.findMany ({
      where: {
        id: userIdInt,
      },
    });
    console.log(allUserPublications);
    return allUserPublications;
  }
  finally {
    await disconnect();
  }
}



module.exports = { getUserPublicationsById, 
                    createUserPublication};
