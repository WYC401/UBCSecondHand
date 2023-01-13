const ItemDB = require("../database/schemas/Item");
const Router = require("express");
const router = Router();
const mongoose = require('mongoose');

// {
//     "title": "E-bike",
//     "price": 200,
//     "description": "This is a new bike",
//     "picturePath" : "/user/pic/1.png"
// }


// these four are from user side.
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

//localhost:3000/api/items/63bfb4f997bd709b83cd3774
router.put("/:itemID", (req, res) => {
    ItemDB.updateOne({_id: mongoose.Types.ObjectId(req.params.itemID)}, req.body).then(() => {
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

router.delete("/:itemID", (req, res) => {
    ItemDB.deleteOne({_id: mongoose.Types.ObjectId(req.params.itemID)}).then(() => {
        res.send(200);
    }).catch((err) => {
        console.log(err.message);
        res.send(400);
    });
});





//from searech side
// app.get('/users', (req, res) => {
//     let age = req.query.age;
//     let operator;
//     if(age.startsWith('gt')){
//       operator = {$gt : parseInt(age.slice(2))};
//     }else if(age.startsWith('lt')){
//       operator = {$lt : parseInt(age.slice(2))};
//     }
//     // Perform the database query to retrieve the users
//     User.find({age: operator}, (err, users) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.json(users);
//       }
//     });
//   });
//TODO: write a parse function which return an query object and be passed into find.
router.get("/search", (req, res) => {
    console.log(req.query);
});
module.exports = router;