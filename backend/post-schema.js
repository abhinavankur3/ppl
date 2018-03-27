let mongoose = require('mongoose');
let postschema = mongoose.Schema({
    name: { type: String },
    emailid: { type: String },
    description: { type: String },
    like: { type: Array },
    comment: [{
        name: '',
        comment: '',
        emailid: ''
    }],
    category: { type: String },
    file: { type: String },
    date: { type: String, default: Date() }

}, { versionKey: false });

module.exports = mongoose.model('pplpost', postschema);