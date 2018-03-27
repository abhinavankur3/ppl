const express = require('express');
const router = express.Router();
const userapi = require('./api.js');

let multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './profilepic')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post('/profilepic', upload.single('postedimage'), async function(req, res) {
    req.body.profilepic = req.file.filename;
    try {
        console.log('user update ', req.body);
        let val = await userapi.userupdate(req.body);
        res.send(val);
    } catch (e) {
        console.log('err in user profile router');

    }
})


router.post('/insert', async function(req, res) {
    let data = req.body;

    try {
        let insert = await userapi.createUser(data);
        console.log(insert);
        // res.render("otp", { emailid: data.emailid, err: "" });
        res.send(insert);
    } catch (e) {
        console.log('errrrrrrr in catch of router');
        // res.send({ msg: "email exist" });
        try {
            let result = await userapi.findUser(req.body);
            if (result[0].password === req.body.password) {
                if (result[0].verified === true) {
                    //res.render("game");
                } else {
                    //userapi.mail(result[0].otp, result[0].emailid);
                    // res.render("otp", { emailid: req.body.emailid, err: "" });
                    //res.send(result);
                }
            } else {
                console.log('password wrong');
                //res.render("signup");
                //console.log(result);
                //res.send(result);
            }
        } catch (e) {
            console.log('error inside catch catch');
        }

    }

});

router.post('/check', async function(req, res) {
    try {
        console.log(req.body);
        let updres = await userapi.updateuser(req.body);
        res.send(updres);
        //res.render("game");
    } catch (e) {
        //res.render("otp", { emailid: req.body.emailid, err: 'Wrong OTP' })
        console.log("update catch error", e);
        res.end();
    }
})

router.post('/find', async function(req, res) {
    try {
        console.log(req.body);
        let val = await userapi.findUser(req.body);
        console.log(val);
        if (val.length !== 0) {
            if (val[0].password !== req.body.password) {
                console.log('wrong login password');
                res.send({ msg: 'wrong password' });
            } else if (!val[0].verified) {
                res.send({ msg: 'please verify from e-mail' });
            } else {
                console.log('right login password');
                res.send({ msg: 'logged In' });
            }
        } else {
            res.send({ msg: 'email does not exist' });
        }
        //res.render("game");
    } catch (e) {
        //res.render("otp", { emailid: req.body.emailid, err: 'Wrong OTP' })
        console.log("update catch error", e);

    }
})

router.post('/profile', async function(req, res) {
    try {
        let val = await userapi.findUser(req.body);
        console.log('profileeeeee', req.body);
        res.send(val);
    } catch (e) {
        console.log('err in user profile router');
    }
})

router.post('/userupdate', async function(req, res) {
    try {
        console.log('user update ', req.body);
        let val = await userapi.userupdate(req.body);
        res.send(val);
    } catch (e) {
        console.log('err in user profile router');

    }
})

router.post('/reset', async function(req, res) {
    try {
        let val = await userapi.findUser(req.body);
        console.log('reset response value ', val);
        if (val.length === 0) {
            res.send({ msg: 'Email not registered' })
        } else {
            let mail = await userapi.resetmail(val[0]._id, val[0].emailid);
            res.send({ msg: 'ok' })
        }
    } catch (e) {
        console.log('err in user reset router');
    }
})

router.post('/password', async function(req, res) {
    try {
        console.log('user password reser body ', res)
        let val = await userapi.resetpassword(req.body);
        console.log('password reset response value ', val);
        res.send(val);
    } catch (e) {
        console.log('err in user password reset router');
    }
})

module.exports = router;