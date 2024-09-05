//const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const path = require("path");
// Construct the absolute path
const filePath = path.resolve(__dirname, "swaggerDoc.yaml");

const swaggerDocument = YAML.load(filePath);

swaggerDocument.servers = swaggerDocument.servers.map((server) => {
  server.url = server.url.replace(
    "__SWAGGER_API_BASE_URL__",
    process.env.SWAGGER_API_BASE_URL || "http://localhost:3000"
  );
  return server;
});

// Now swaggerDocument contains your dynamically updated OpenAPI document
module.exports = (app) => {
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
