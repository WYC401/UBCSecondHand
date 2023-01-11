//connect to database -> then mount the passport strategy -> auth router
const express = require("express");
require("./database/index"); 

const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const user = require("./routes/user");
const app = express();
const PORT = 3000;
require("./strategies/local");
app.use(express.json());// it's a global middleware
app.use(cookieParser());
app.get("/", (req, res) => {
    console.log("Hey I got you");
    res.send(200);
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", auth);
app.use("/api/user", user);


app.listen(PORT, 'localhost', () => {
    console.log(`is listening to ${PORT}` );
});

//localhost:3000/api/user/profile
//localhost:3000/api/auth/login
