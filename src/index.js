//connect to database -> then mount the passport strategy -> auth router
const express = require("express");
require("./database/index.js"); 
require("./strategies/local.js");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");

const app = express();
const PORT = 3000;
app.use(express.json());// it's a global middleware
app.use(cookieParser());
app.get("/", (req, res) => {
    console.log("Hey I got you");
    res.send(200);
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", auth);



app.listen(PORT, 'localhost', () => {
    console.log(`is listening to ${PORT}` );
});


