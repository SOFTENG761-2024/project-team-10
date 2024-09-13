//SignIn
// get token and profile - email address
// use email address to query database to get userid, return to front-end

import express, { Router } from "express";
const getOpenIdToken = require('../services/openIDService');
const env = require('dotenv');
env.config({ path: path.resolve(__dirname, '../.env') });

const router = express.Router();

//SignIn

Router.post("/signin", async (req, res) => {
    try {
        const grant_type = 'authorization_code';
        const code = req.body; // req.body.code
        const client_id = process.env.LINKEDIN_CLIENT_ID;
        const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
        const redirect_uri = process.env.LINKEDIN_REDIRECT_URI;
        const url = process.env.LINKEDIN_TOKEN_URL;
        const tokenData = await getOpenIdToken(grant_type, code, client_id, client_secret, redirect_uri, url);
        console.log('Token Data:', tokenData);
        //  createUser(user_email); xxx@xxx.com -> set password -> api
        

        authService.login(user_id);
        return res.status(201)
            .json(tokenData.email); // redirect to home
    } catch (error) {
        console.error('Error during test:', error);
        return res.sendStatus(422);
    }

}
)