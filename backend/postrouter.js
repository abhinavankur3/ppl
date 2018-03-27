const postuserapi = require('./postapi.js');
const userapi = require('./api.js');

let express = require('express');
let postrouter = express.Router();
let multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage })

postrouter.post('/', upload.single('postedimage'), async function(req, res) {
    req.body.file = req.file.filename;
    req.body.date = Date();

    console.log("filename" + req.file.filename);
    console.log(" body filename " + req.body.file)
    try {
        let findres = await userapi.findUser(req.body);
        req.body.name = findres[0].fname + " " + findres[0].lname;
        console.log("new body", req.body);
        let finalres = await postuserapi.createUser(req.body);
        res.send(finalres);
    } catch (e) {
        console.log("error in postrouter", e);
    }

    //res.send('uploaded');
})

postrouter.post('/find', async function(req, res) {
    try {
        console.log("find post body ", req.body);
        let val = await postuserapi.findUser(req.body);
        res.send(val);
    } catch (e) {
        console.log('error in postuser find catch');
    }
})

postrouter.post('/update', async function(req, res) {
    try {
        console.log("update post body ", req.body);
        let val = await postuserapi.updatepost(req.body);
        let valnew = await postuserapi.findUser({ _id: req.body._id });
        res.send(valnew);
    } catch (e) {
        console.log('error in postuser update catch');
    }
})

postrouter.post('/reupdate', async function(req, res) {
    try {
        console.log("update post body ", req.body);
        let val = await postuserapi.reupdatepost(req.body);
        let valnew = await postuserapi.findUser({ _id: req.body._id });
        res.send(valnew);
    } catch (e) {
        console.log('error in postuser reupdate catch');
    }
})

postrouter.post('/comment', async function(req, res) {
    try {
        console.log("update post body ", req.body);
        let findres = await userapi.findUser(req.body);
        req.body.name = findres[0].fname + " " + findres[0].lname;

        let val = await postuserapi.commentuser(req.body);

        let newval = await postuserapi.findUser({ _id: req.body._id });
        res.send(newval);
    } catch (e) {
        console.log('error in postuser reupdate catch');
    }
})

postrouter.post('/search', async function(req, res) {
    try {
        console.log("search post body ", req.body);
        let val = await postuserapi.searchpost(req.body);
        res.send(val);
    } catch (e) {
        console.log('error in postuser find catch');
    }
})

module.exports = postrouter;