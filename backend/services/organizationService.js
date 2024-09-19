const orgDao = require("../daos/organizationDao.js");
const logger = require("../utils/logger.js");

async function createUserOrganization(orgObject) {

    const existingOrg = await orgDao.getOrganizationByName(orgObject.name);
    if (existingOrg) {
        throw new Error(
            `Organization already exists.`
        );
    }
    logger.info(
        `Creeating organization ${orgObject.name}.`
    );
    const organization = await orgDao.createOrganization(orgObject);
    logger.info(`Created organization: ${JSON.stringify(organization)}`);
    return organization;
}

async function getOrganizationByName(name) {
    logger.info(`Getting organization by name: ${name}`);
    const organization = await orgDao.getOrganizationByName(name);
    return organization;
}

async function getOrganizationById(id) {
    logger.info(`Getting organization by id: ${id}`);
    const organization = await orgDao.getOrganizationById(id);
    return organization;
}

async function getAllOrganizations() {
    logger.info('Getting all organizations');
    const organizations = await orgDao.getAllOrganizations();
    return organizations;
}

module.exports = {
    createUserOrganization,
    getOrganizationByName,
    getOrganizationById,
    getAllOrganizations,
};