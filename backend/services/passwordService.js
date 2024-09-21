const generator = require('generate-password');
const bcrypt = require('bcryptjs');

function generateRandomPassword() {
    return generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
        strict: true,
    });
}

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, hashedPassword) {
    if (!password || !hashedPassword) {
        return false;
    }
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    generateRandomPassword,
    hashPassword,
    comparePassword,
};