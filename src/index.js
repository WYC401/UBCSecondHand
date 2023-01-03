const express = require("express");

const app = express();
const PORT = 3000;
app.listen(PORT, 'localhost', () => {
    console.log(`is listening to ${PORT}` );
});

app.get("/", (req, res) => {
    console.log("Hey I got you");
    res.send(200);
});
