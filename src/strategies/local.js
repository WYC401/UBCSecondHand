const passport = require("passport");
const {Strategy} = require("passport-local");
const User = require("../database/schemas/User.js");

// to uderstand the flow of authentication, see http://toon.io/understanding-passportjs-authentication-flow/

passport.use(new Strategy({
    usernameField: 'email',
},
   async (email, password, done) => {
            console.log("using this strategy!");
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

passport.serializeUser((user,done) => {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("deserializing user");
    try{
        const user = await User.findById(id);
        if(!user){
            throw new Error("User not  find");
        }
        done(null, user);
    } catch(error) {
        console,log(error);
        done(error, null);
    }
});