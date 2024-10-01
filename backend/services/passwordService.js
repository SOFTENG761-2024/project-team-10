const generator = require('generate-password');
const bcrypt = require('bcryptjs');

function generateRandomPassword() {
    const customCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    return generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
        strict: true,
        excludeSimilarCharacters: true,
        characters: customCharacters,
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