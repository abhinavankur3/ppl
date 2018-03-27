let mongoose = require('mongoose');
let userschema = mongoose.Schema({
    username: { type: String },
    fname: { type: String },
    lname: { type: String },
    emailid: { type: String, unique: true },
    password: { type: String },
    verified: { type: Boolean, default: false },
    description: { type: String, default: '' },
    sex: { type: String },
    profilepic: { type: String, default: '' }

}, { versionKey: false });

module.exports = mongoose.model('ppluser', userschema);