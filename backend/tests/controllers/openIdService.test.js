

const env = require('dotenv');
const path = require('path');
env.config({path: path.resolve(__dirname, '../../.env')}); 

const getOpenIdToken = require('../../services/openIDService');

async function testIDToken() {
  try {
    const grant_type = 'authorization_code';
    const code = 'AQQ-96uXQCIZbkLdWuTRxNXoIapPxxNFWM4ZlpVN6sbCsUvkhG4JMYtLrjD-LYXbUWDC4K5JZ9bs3DUxBX0OnCYVCyz3T9Sxx14gzISsF5zfoyfrAlbwSZ-ll5HpxyovoX86UwX9BwE2cqWFXQA16mQMUMsUhP0ojsY_QmaROVzP63p5OUU_F4hn_MeX434TAz7hE15-72dukNaIOHE';
    const client_id = process.env.LINKEDIN_CLIENT_ID;
    const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirect_uri = process.env.LINKEDIN_REDIRECT_URI;
    const url = process.env.LINKEDIN_TOKEN_URL;
    const tokenData = await getOpenIdToken(grant_type, code, client_id, client_secret, redirect_uri,url);
    console.log('Access Token:', tokenData.email);
    console.log('Token Data:', tokenData);
  } catch (error) {
    console.error('Error during test:', error);
  }
}

testIDToken();
