const Router = require("express");
const router = Router();
const passport = require("passport");
const UserDB = require("../database/schemas/User");
require("../strategies/local");
router.post("/login", passport.authenticate('local'
), (req, res)=> {
    console.log("Login In");
    res.send(201);
});
router.post("/register", async (req, res) => {
    console.log("welcome to login in page");
    const {email, password} = req.body;
    const findEmail = await UserDB.findOne({email: email});
    if(findEmail) {
        res.redirect("login"); //TODO: it should change once homepage is determined
        
    } else {
        
        await UserDB.create({email: email, password: password});
        console.log("successfully register");
        res.redirect("/");

    }
    
});

// once successfully login in, we will have user information on req.user

module.exports = router;