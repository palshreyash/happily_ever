const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:String,
    dob:String,
    stat:{type:String,default:"active"}
});

const user = mongoose.model('users',UserSchema);
module.exports = user;