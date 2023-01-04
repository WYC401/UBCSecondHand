const passport = require("passport");
const {Strategy} = require("passport-local");
const User = require("../database/schemas/User.js");
passport.use(new Strategy(
   async (email, password, done) => {
        
            if(!email || !password) {
                done(new Error("Have not enterred Email or Password"), null);
            }
            const userDB = await User.findOne({email: email});
            if(!userDB) {
                done(null, false);
            }
            if(userDB.password === password) {
                done(null, userDB);
            } else {
                done(null, false);
            }
       
        
    }
));