//SignIn
// get token and profile - email address
// use email address to query database to get userid, return to front-end

const express = require("express");
const passport = require ("passport");
const path = require('path');
const router = express.Router();
const getOpenIdToken = require('../services/openIDService');
const env = require('dotenv');
//const { route } = require("./userController"); 
const { createUserProfile, getUserProfileByPrimaryEmail } = require("../daos/userProfileDao");
env.config({ path: path.resolve(__dirname, '../.env') });

// auth login
// router.get('/login', async (req,res) => {
//     res.render('login');
// })

//auth logout
router.get('/signout', async (req,res)=>{
    //handle with passport
    res.send('signingout')
})

//Linkdein SignIn
router.get('/linkedin', passport.authenticate('linkedin', { state: '123', passReqToCallback: true, }), 
    async (req,res)=>{
        
        console.log(req.body);
        res.send('linkedin');
});


//callback route for google to redirect to
router.get('/linkedin/redirect', async (req, res) => {
    res.send('you reached the redirect URI');
   
    
    try {
        const grant_type = 'authorization_code';
        const code = req.query.code;
        console.log("code--> ", code);
        const client_id = process.env.LINKEDIN_CLIENT_ID;
        const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
        const redirect_uri = process.env.LINKEDIN_REDIRECT_URI;
        const url = process.env.LINKEDIN_TOKEN_URL;
        const tokenData = await getOpenIdToken(grant_type, code, client_id, client_secret, redirect_uri,url);
        getUserProfileByPrimaryEmail(tokenData.email).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                //done(null, currentUser);
                //res.redirect('/api/test');
            } else {
                // if not, create user in our db
                const userProfile = {
                    "usertypeid": 2,
                    "institution_id": null,
                    "faculty_id": null,
                    "organization_id": null,
                    "first_name": tokenData.given_name,
                    "last_name": tokenData.family_name,
                    "preferred_name": null,
                    "title": "Ms",
                    "primary_email": tokenData.email,
                    "department": "",
                    "orcid_identifier": null,
                    "linkedin_url": "",
                    "secondary_email": "",
                    "mobile_phone": "",
                    "bio": "Test bio",
                    "research_area": "",
                    "skills": "",
                    "research_tags": "",
                    "expertise": "",
                    "positions": "",
                    "tools": "",
                    "profile_picture": tokenData.picture,
                    "is_scraped": false,
                    "is_verified": false,
                    "signup_datetime": "2024-09-13T10:11:58.021Z"
                  }
        
                const response = createUserProfile(userProfile);
                if(response){
                    console.log("Saving Successfully");
                } else {
                    console.log("failed to create user");
                }
            }
        });
        passport.serializeUser(tokenData.email);
        
        
      } catch (error) {
        console.error('Error during test:', error);
      }

});


//router.get('/linkedin')

// router.post("/signin-linkedin", async (req, res) => {
//     try {
//         //Attn: KAREN - fix this please - HI  

//         // const grant_type = 'authorization_code';
//         // const code = req.body; // req.body.code
//         // const client_id = process.env.LINKEDIN_CLIENT_ID;
//         // const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
//         // const redirect_uri = process.env.LINKEDIN_REDIRECT_URI;
//         // const url = process.env.LINKEDIN_TOKEN_URL;
//         // const tokenData = await getIdToken(grant_type, code, client_id, client_secret, redirect_uri, url);
//         // console.log('Token Data:', tokenData);
//         // //createUser(user_email); xxx@xxx.com -> set password -> api
        

//         // authService.login(user_id);
//         // return res.status(201)
//         //     .json(tokenData.email); // redirect to home

//         console.log(req.body); //TEMP CODE Attn Karen - HI
//     } catch (error) {
//         console.error('Error during test:', error);
//         return res.sendStatus(422);
//     }

// }
// )

module.exports = router;