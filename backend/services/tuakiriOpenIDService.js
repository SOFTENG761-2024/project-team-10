const axios = require('axios');
const qs = require('qs');
const jwt = require ('jsonwebtoken');

async function getTuakiriProfile(grant_type, code, client_id, client_secret, redirect_uri){

    const authHeaderForToken = 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  

    const data = {
        grant_type: grant_type,
        code: code, 
        redirect_uri: redirect_uri
    };

    try{

        const response = await axios.post('https://openidconnect.test.tuakiri.ac.nz/OIDC/token', qs.stringify(data), {
            headers: {
                'Authorization': authHeaderForToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const token = response.data.access_token;

        try {

            const response = await axios.post('https://openidconnect.test.tuakiri.ac.nz/OIDC/userinfo', qs.stringify(data), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    
            const profile = response.data;

            return profile;

        } catch(error) {
            console.error('Error fetching profile:', error.response ? error.response.data : error.message);
            throw error;
        }
        
    } catch(error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        throw error;
    }

}


module.exports = getTuakiriProfile; 
