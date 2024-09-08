

const env = require('dotenv');
const path = require('path');
env.config({path: path.resolve(__dirname, '../../.env')}); 

const getOpenIdToken = require('../../controllers/openIDController');

async function testIDToken() {
  try {
    const grant_type = 'authorization_code';
    const code = 'AQS2YQgiWdhflfNa7darY8HS5E3cS-meH_QBGhESzdJCx6q4eZ7u3AINC_HK5j556Jsk2cXvAZWv1xO9zi2LFk-1K6xap6BF3V9kQfJTgC2noDJ6fzy5ASvffDq_g_CPYEkNeBeUoF0Tu-2wJb202SWq9Sa-qrtwN-HOYeRP9Sb2lxcmRBGlUS1dcxOAfEC2yDgFwXtp4e1KNoTD2Gs';
    const client_id = process.env.LINKEDIN_CLIENT_ID;
    const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirect_uri = process.env.LINKEDIN_REDIRECT_URI;
    const url = 'https://www.linkedin.com/oauth/v2/accessToken'
    const tokenData = await getOpenIdToken(grant_type, code, client_id, client_secret, redirect_uri,url);
    console.log('Access Token:', tokenData.email);
    console.log('Token Data:', tokenData);
  } catch (error) {
    console.error('Error during test:', error);
  }
}

testIDToken();
