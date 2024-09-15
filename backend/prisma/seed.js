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
      {id:1, name: 'Academic User' },
      { id:2, name: 'Business User' },
      { id:3, name: 'Unauthenticated User' },
    ],
  });

  await prismaClient.institution.createMany({
    data: [
      { id:1, name: 'University of Auckland', address: 'Auckland' },
      { id:2, name: 'Massey University', address: 'Palmerston North' },
      { id:3, name: 'University of Waikato', address: 'Hamilton' },
      { id:4, name: 'University of Otago', address: 'Dunedin' },
      { id:5, name: 'Victoria University of Wellington', address: 'Wellington' },
      { id:6, name: 'University of Canterbury', address: 'Christchurch' },
      { id:7, name: 'Lincoln University', address: 'Lincoln' },
      { id:8, name: 'Auckland University of Technology', address: 'Auckland' },
    ],
  });

  await prismaClient.faculty.createMany({
    data: [
      { id:1, name: 'Law School' },
      { id:2, name: 'School of business management' },
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
