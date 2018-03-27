const catapi = require('./catapi.js');


let express = require('express');
let catrouter = express.Router();
let multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './categories')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage })

catrouter.post('/create', upload.single('postedimage'), async function(req, res) {
    req.body.filename = req.file.filename;
    try {
        let cat = await catapi.createUser(req.body);
        res.send(cat);
    } catch (e) {
        console.log('error in cat create router');
    }
});

catrouter.post('/find', async function(req, res) {
    try {
        console.log("find post bodyuuuu ", req.body);
        let val = await catapi.findUser(req.body);
        res.send(val);
    } catch (e) {
        console.log('error in postuser find catch');
    }
})

module.exports = catrouter;