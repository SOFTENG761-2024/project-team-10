const getOpenIdToken = require("../services/openIDService");
const { getUserProfileByPrimaryEmail, createUserProfile } = require("../daos/userProfileDao");
const { Strategy: PassportStrategy } = require('passport-strategy');

class linkedinOpenIdStrategy extends PassportStrategy {
    constructor(options, verify) {
        super(); // Call the constructor of PassportStrategy
        this.name = 'linkedinOpenId'; // Name of the strategy
        this.verify = verify; // `verify` is a callback function to handle authentication
    }

    async authenticate(req) {
        const code = req.query.code;
        console.log("code--> ", code);
        try {
            const grant_type = "authorization_code";
            const client_id = process.env.LINKEDIN_CLIENT_ID;
            const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
            const redirect_uri = process.env.BACKEND_API_BASE_URL + process.env.LINKEDIN_REDIRECT_URI;
            const url = process.env.LINKEDIN_TOKEN_URL;
            const tokenData = await getOpenIdToken(
                grant_type,
                code,
                client_id,
                client_secret,
                redirect_uri,
                url
            );
            if (tokenData) {
                console.log("tokenData: ", tokenData);
                let dbUser = await getUserProfileByPrimaryEmail(tokenData.email);
                if (!dbUser) {
                    // if not, create user in our db
                    const userProfile = {
                        usertypeid: 2,
                        institution_id: null,
                        faculty_id: null,
                        organization_id: null,
                        first_name: tokenData.given_name,
                        last_name: tokenData.family_name,
                        preferred_name: null,
                        title: "Ms",
                        primary_email: tokenData.email,
                        department: "",
                        orcid_identifier: null,
                        linkedin_url: "",
                        secondary_email: "",
                        mobile_phone: "",
                        bio: "",
                        research_area: "",
                        skills: "",
                        research_tags: "",
                        expertise: "",
                        positions: "",
                        tools: "",
                        profile_picture: tokenData.picture,
                        is_verified: false,
                        signup_datetime: new Date(),
                    };
                    dbUser = await createUserProfile(userProfile);
                    if (dbUser) {
                        console.log("Saving Successfully");
                    } else {
                        return this.fail({ message: 'Invalid credentials' }, 401);
                    }
                }
                let currentUser = { id: dbUser.id, email: dbUser.primary_email, is_verified: dbUser.is_verified };
                console.log("currentUser: ", currentUser);
                return this.success(currentUser);
            }
            else {
                return this.fail({ message: 'Invalid tokenData' }, 401);
            }

        } catch (error) {
            console.error("Error during test:", error);
        }
    }
}

// Export the strategy for use in your app
module.exports = linkedinOpenIdStrategy;
