let mongoose = require('mongoose');
let catschema = mongoose.Schema({
    category: { type: String, unique: true },
    filename: { type: String }
}, { versionKey: false })
module.exports = mongoose.model('pplcategory', catschema);