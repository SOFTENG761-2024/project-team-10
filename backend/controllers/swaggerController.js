//const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');

const path = require('path');
// Construct the absolute path
const filePath = path.resolve(__dirname,'swaggerDoc.yaml');

console.log('File Path:', filePath);
const swaggerDocument = YAML.load(filePath);

//console.log(swaggerDocument);

// const options = {
//   swaggerDefinition: {
//     restapi: "3.1.0",
//     info: {
//       title: "give-it-a-good-name api",
//       version: "1.0.0",
//       description: "give-it-a-good-name API",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
//       },
//     ],
//   },
//   apis: ["/usr/src/app/backend/controllers/*.js", "./controllers/*.js"],
// };

//const specs = swaggerJsdoc(options);


//module.exports = (app) => {
//  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
//};

module.exports = (app) => {
  app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
