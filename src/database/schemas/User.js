const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        unique: true,
        type:  mongoose.SchemaTypes.String,
        required: true
    },
    phone_number: mongoose.SchemaTypes.String,
    credit_score: {
        type: mongoose.SchemaTypes.Number,
        default: 100,
        required: true
    },
    createAt: {
        type: mongoose.SchemaTypes.Date,
        required:true,
        default: new Date(),

    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    }

});
module.exports = mongoose.model("User", UserSchema);