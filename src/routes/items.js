const ItemDB = require("../database/schemas/Item");
const Router = require("express");
const router = Router();

// {
//     "title": "E-bike",
//     "price": 200,
//     "description": "This is a new bike",
//     "picturePath" : "/user/pic/1.png"
// }

router.post("/postNewItem", (req, res) => {
    const temp = req.body;
    temp.userID = req.user._id;
    ItemDB.create(temp).then(() => {
        res.send(200);
    }).catch((err) => {
        console.log(err.message);
        res.send(400);
    });
});

router.put("/:itemID", (req, res) => {
    ItemDB.updateOne({_id: req.params.itemID}, req.body).then(() => {
        res.send(200);
    }).catch((err) => {
        console.log(err.message);
        res.send(400);
    });
    
});
// send back array of json
router.get("/", (req, res) => {
    ItemDB.find({userID: req.user._id}, (err, items) => {
        if(err) res.send(400);
        else {
            items.forEach (item => {JSON.stringify(item)});
            console.log(items);
            res.send(items);
        }
    });
})

module.exports = router;