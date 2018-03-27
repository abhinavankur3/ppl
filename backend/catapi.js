const catdb = require('./catSchema');

module.exports = {

    createUser: function(data) {
        return new Promise((res, rej) => {
            console.log('create user data', data)
            catdb.create(data, (err, result) => {
                if (err) {
                    console.log('postapi err ', err);
                    rej(err);
                } else {
                    console.log("postapi result", result);
                    res(result);
                }
            });
        });
    },

    findUser: function(data) {
        return new Promise((res, rej) => {
            catdb.find(data, (err, result) => {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            });
        });
    }
}