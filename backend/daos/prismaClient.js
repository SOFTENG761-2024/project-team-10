/* eslint-disable no-undef */
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const disconnect = async () => {
  await prismaClient.$disconnect();
};

module.exports = { disconnect, prismaClient };
