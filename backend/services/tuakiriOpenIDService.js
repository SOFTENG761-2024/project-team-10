const axios = require('axios');
const qs = require('qs');
const path = require('path');
const env = require('dotenv');

env.config({ path: path.resolve(__dirname, '../.env') });


async function getTuakiriProfile(grant_type, code, client_id, client_secret, redirect_uri){

    const authHeaderForToken = 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  

    const data = {
        grant_type: grant_type,
        code: code, 
        redirect_uri: redirect_uri
    };

    try{

        const response = await axios.post(process.env.TUAKIRI_TOKEN_URL, qs.stringify(data), {
            headers: {
                'Authorization': authHeaderForToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const token = response.data.access_token;
        console.log("token:"+token)

        try {

            const response = await axios.post(process.env.TUAKIRI_USERINFO_URL, qs.stringify(data), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    
            const profile = response.data;
            console.log("profile: "+profile);

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
