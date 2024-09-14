const axios = require('axios');
const qs = require('qs');
const jwt = require ('jsonwebtoken');

async function getOpenIdToken(grant_type, code, client_id, client_secret, redirect_uri, url){
    const data = {
        grant_type: grant_type,
        code: code, 
        client_id: client_id,
        client_secret,
        redirect_uri: redirect_uri
    };

    try{

        const response = await axios.post(url, qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const token = response.data.id_token;
        const decoded = jwt.decode(token);
        return decoded;
        
    } catch(error) {
        console.error('Error fetching id token:', error.response ? error.response.data : error.message);
        throw error;
    }

}


module.exports = getOpenIdToken; 
