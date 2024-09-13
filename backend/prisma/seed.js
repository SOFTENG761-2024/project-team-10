const { prismaClient, disconnect } = require("../daos/prismaClient");


async function main()
 {
  if(await prismaClient.usertype.count() > 0)
  {
    console.log("Static Data Already Exists");
  }
  else{

  await prismaClient.usertype.createMany({
    data: [
      { name: 'Academic User' },
      { name: 'Business User' },
      { name: 'Unauthenticated User' },
    ],
  });

  await prismaClient.institution.createMany({
    data: [
      { name: 'University of Auckland', address: 'Auckland' },
      { name: 'Massey University', address: 'Palmerston North' },
      { name: 'University of Waikato', address: 'Hamilton' },
      { name: 'University of Otago', address: 'Dunedin' },
      { name: 'Victoria University of Wellington', address: 'Wellington' },
      { name: 'University of Canterbury', address: 'Christchurch' },
      { name: 'Lincoln University', address: 'Lincoln' },
      { name: 'Auckland University of Technology', address: 'Auckland' },
    ],
  });

  await prismaClient.faculty.createMany({
    data: [
      { name: 'Law School' },
      { name: 'School of business management' },
    ],
  });
}
}

main()
  .catch((ex) => {
    console.error(ex);

  })
  .finally(async () => {
    await disconnect();
  });
