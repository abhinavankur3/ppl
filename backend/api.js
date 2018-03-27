const nodemailer = require('nodemailer');
const userdb = require('./schema.js');

module.exports = {

    createUser: function(data) {
        return new Promise((res, rej) => {
            console.log('create user data', data);

            //const otp = Math.floor(Math.random() * (10000 - 1000)) + 1000;
            //data.otp = otp;
            userdb.create(data, (err, result) => {
                if (err) {
                    rej(err);
                } else {
                    const login = `http://localhost:3000/login/${result._id}`;
                    if (!result.verified) {
                        this.mail(login, data.emailid);
                    }

                    res(result);
                }
            });
        });
    },
    findUser: function(data) {
        return new Promise((res, rej) => {
            userdb.find({ emailid: data.emailid }, (err, result) => {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            });
        });
    },
    updateuser: function(data) {
        return new Promise((res, rej) => {
            userdb.update(data, { $set: { verified: true } }, (err, result) => {
                if (err) {
                    console.log("err in update if", err);
                    rej('not updated');
                } else {
                    console.log(result);
                    //res(result);
                    userdb.find(data, (err, result) => {
                        console.log(result);
                        res(result);
                    })
                }
            })
        })
    },
    mail: function(login, id) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: 'abhinav.ankur@daffodilsw.com',
                pass: 'Abhinav@5'
            }
        });

        let mailOptions = {
            from: 'Abhinav Ankur <abhinav.ankur@daffodilsw.com>',
            to: id,
            subject: 'Verification mail',
            text: `please login here : ${login}`

        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('error in sending mail', err);
            } else {
                console.log('mail sent', info);
            }
        })
    },
    userupdate: function(data) {
        return new Promise((res, rej) => {
            userdb.update({ emailid: data.emailid }, { $set: data }, (err, result) => {
                if (err) {
                    console.log("err in update if", err);
                    rej('not updated');
                } else {
                    console.log(result);
                    userdb.find({ emailid: data.emailid }, (err, result) => {
                            console.log(result);
                            res(result);
                        })
                        //res(result);
                }
            })
        })
    },

    resetmail: function(login, id) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: 'abhinav.ankur@daffodilsw.com',
                pass: 'Abhinav@5'
            }
        });

        let mailOptions = {
            from: 'Abhinav Ankur <abhinav.ankur@daffodilsw.com>',
            to: id,
            subject: 'Verification mail',
            text: `please reset your password here : http://localhost:3000/login/reset/${login}`

        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('error in sending reset mail');
            } else {
                console.log('reset mail sent');
            }
        })
    },

    resetpassword: function(data) {
        return new Promise((res, rej) => {
            userdb.update({ _id: data.id }, { $set: { password: data.password } }, (err, result) => {
                if (err) {
                    console.log("err in update if", err);
                    rej('not updated');
                } else {
                    console.log(result);
                    userdb.find({ _id: data.id }, (err, result) => {
                            console.log(result);
                            res(result);
                        })
                        //res(result);
                }
            })
        })
    }
}