const e = require('express');
const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email:{ type: String, required: true, unique: true}, 
    mobile: { type: String, required: true, unique: true},
    gender: { type: String, required: true},
    profession: { type: String, required: true},
    password: { type: String, required: true},
    image: String
},{
    collection: "UserInfo"
});
mongoose.model("UserInfo", UserDetailSchema);