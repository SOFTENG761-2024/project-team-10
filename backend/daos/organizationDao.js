const { prismaClient, disconnect } = require("../daos/prismaClient");

async function createOrganization(organizationData) {
    try {
        const org = await prismaClient.organization.create({
            data: organizationData,
        });

        return org;
    } finally {
        disconnect();
    }
}

async function getOrganizationById(id) {
    try {
        const org = await prismaClient.organization.findFirst({
            where: {
                id: id,
            },
        });
        return org;
    } finally {
        await disconnect();
    }
}

async function getOrganizationByName(name) {
    try {
        const org = await prismaClient.organization.findFirst({
            where: {
                name: name,
            },
        });
        return org;
    } finally {
        await disconnect();
    }
}

module.exports = { createOrganization, getOrganizationById, getOrganizationByName };