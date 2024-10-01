const { prismaClient, disconnect } = require("../daos/prismaClient");
const env = require("dotenv");
const path = require("path");
env.config({ path: path.resolve(__dirname, "../.env") });

async function main() {
  if (await prismaClient.usertype.count() > 0) {
    console.log("Static Data Already Exists");
  }
  else {
    await prismaClient.usertype.createMany({
      data: [
        { id: 1, name: 'Academic User' },
        { id: 2, name: 'Business User' },
        { id: 3, name: 'Administrator User' },
      ],
    });

    await prismaClient.institution.createMany({
      data: [
        { id: 1, name: 'University of Auckland', address: 'Auckland' },
        { id: 2, name: 'Massey University', address: 'Palmerston North' },
        { id: 3, name: 'University of Waikato', address: 'Hamilton' },
        { id: 4, name: 'University of Otago', address: 'Dunedin' },
        { id: 5, name: 'Victoria University of Wellington', address: 'Wellington' },
        { id: 6, name: 'University of Canterbury', address: 'Christchurch' },
        { id: 7, name: 'Lincoln University', address: 'Lincoln' },
        { id: 8, name: 'Auckland University of Technology', address: 'Auckland' },
      ],
    });

    await prismaClient.faculty.createMany({
      data: [
        { id: 1, name: 'Law School' },
        { id: 2, name: 'School of business management' },
      ],
    });

    await prismaClient.organization.createMany({
      data: [
        { name: "Jimenez's Inc.", address: "95 Mosley St" },
        { name: "Frances Food Inc.", address: "562 68 Qinghe Middle St, Haidian District" },
        { name: "Rogers Pharmaceutical Inc.", address: "877 Osney Mead" },
      ],
    });

    await prismaClient.user_profile.createMany({
      data: [
        { usertypeid: 3, first_name: 'Admin', last_name: 'Admin', title: 'Ms.', primary_email: process.env.DB_ADMIN_EMAIL, is_verified: true, signup_datetime: new Date('2006-02-26T10:13:02Z'), password: process.env.DB_ADMIN_PASSWORD_ENCRYPTED },
        { usertypeid: 2, first_name: 'Jonathan', last_name: 'Phillips', title: 'Ms.', primary_email: 'jonphillips626@hotmail.com', is_verified: true, signup_datetime: new Date('2006-02-26T10:13:02Z'), organization_id: 1 },
        { usertypeid: 2, first_name: 'Theresa', last_name: 'Wright', title: 'Ms.', primary_email: 'theresawrigh@icloud.com', is_verified: false, signup_datetime: new Date('2021-07-13T10:36:48Z'), organization_id: 1 },
        { usertypeid: 1, first_name: 'Tina', last_name: 'Spencer', title: 'Prof.', primary_email: 'spentina@gmail.com', signup_datetime: new Date('2012-10-07T15:44:00Z'), organization_id: 2 },
        { usertypeid: 1, first_name: 'Aaron', last_name: 'Hamilton', title: 'Prof.', primary_email: 'hamia@icloud.com', is_verified: false, signup_datetime: new Date('2002-07-08T17:21:16Z'), organization_id: 1 },
        { usertypeid: 2, first_name: 'Katherine', last_name: '', title: 'Mrs.', primary_email: 'okat3@icloud.com', is_verified: false, signup_datetime: new Date('2003-09-12T21:01:50Z'), organization_id: 2 },
        { usertypeid: 2, first_name: 'Theodore', last_name: '', title: 'Prof.', primary_email: 'sanderstheod6@outlook.com', is_verified: false, signup_datetime: new Date('2011-09-05T03:48:36Z'), organization_id: 1 },
        { usertypeid: 2, first_name: 'Valerie', last_name: 'Davis', title: 'Mrs.', primary_email: 'davisv1025@outlook.com', is_verified: false, signup_datetime: new Date('2007-07-30T04:15:53Z'), organization_id: 3 },
        { usertypeid: 2, first_name: 'Marie', last_name: 'Weaver', title: 'Miss.', primary_email: 'marweave@hotmail.com', is_verified: true, signup_datetime: new Date('2012-03-30T19:08:31Z'), organization_id: 1 },
        { usertypeid: 2, first_name: 'Nicholas', last_name: 'Cole', title: 'Miss.', primary_email: 'colenicholas@gmail.com', is_verified: false, signup_datetime: new Date('2009-10-13T09:05:44Z'), organization_id: 3 },
        { usertypeid: 2, first_name: 'Antoni', last_name: 'Lopez', title: 'Mr.', primary_email: 'antolopez4@gmail.com', is_verified: true, signup_datetime: new Date('2003-09-29T21:40:09Z'), organization_id: 1 },
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
