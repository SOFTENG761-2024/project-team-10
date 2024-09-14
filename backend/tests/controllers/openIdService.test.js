

// const env = require('dotenv');
// const path = require('path');
// env.config({path: path.resolve(__dirname, '../../.env')}); 

// const getOpenIdToken = require('../../services/openIDService');

// async function testIDToken() {
//   try {
//     const grant_type = 'authorization_code';
//     const code = 'AQTgrUCACAp2xlBqPxauLTJ0-gRV0LaCOyt1tLqItg3qoKmlsZNKG7cMMQVYE71P5UQC_K3b30zTQPLBKt4pr3rToeAL-z7NuN1naZocQUc2Ghrc_-PPJgjSfDtz_65svDP67dado1f-5WhtbEOuUCfUawmRw-qgl6LAbFvhD1z_BXWGHnOCqIS6661xQkHGDFFCtuwCDesHCI10o2g';
//     const client_id = process.env.LINKEDIN_CLIENT_ID;
//     const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
//     const redirect_uri = process.env.LINKEDIN_REDIRECT_URI;
//     const url = process.env.LINKEDIN_TOKEN_URL;
//     const tokenData = await getOpenIdToken(grant_type, code, client_id, client_secret, redirect_uri,url);
//     console.log('Email:', tokenData.email);
//     console.log('Token Data:', tokenData);
//   } catch (error) {
//     console.error('Error during test:', error);
//   }
// }

// testIDToken();
