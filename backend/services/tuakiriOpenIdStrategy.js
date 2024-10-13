const getTuakiriProfile = require("./tuakiriOpenIDService");
const { getUserProfileByPrimaryEmail, createUserProfile } = require("../daos/userProfileDao");
const { Strategy: PassportStrategy } = require('passport-strategy');

class tuakiriOpenIdStrategy extends PassportStrategy {
    constructor(verify) {
        super(); // Call the constructor of PassportStrategy
        this.name = 'tuakiriOpenId'; // Name of the strategy
        this.verify = verify; 
    }

    async authenticate(req) {
        const code = req.query.code;
        console.log("code--> ", code);
        try {
            const grant_type = "authorization_code";
            const client_id = process.env.TUAKIRI_CLIENT_ID;
            const client_secret = process.env.TUAKIRI_CLIENT_SECRET;
            const redirect_uri = process.env.TUAKIRI_REDIRECT_URI;
            const url = process.env.TUAKIRI_TOKEN_URL;
            const tokenData = await getTuakiriProfile(
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
                        usertypeid: 1,
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
                        profile_picture: "",
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
module.exports = tuakiriOpenIdStrategy;
