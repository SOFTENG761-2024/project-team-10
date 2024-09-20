const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        console.log("No current user");
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.send('you are logged in, this is your profile - ' + req.user.primary_email);
});

module.exports = router;