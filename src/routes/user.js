const Router = require("express");
// get user profile, get request
// add item to items, post request 
const router = Router();

router.get("/profile", (req, res)=> {
    res.send(req.user);
});

router.put("/profile", (req, res)=> {
    
});;