const userpostdb = require('./post-schema');

module.exports = {

    createUser: function(data) {
        return new Promise((res, rej) => {
            console.log('create user data', data)
            userpostdb.create(data, (err, result) => {
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
            userpostdb.find(data, (err, result) => {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            });
        });
    },
    updatepost: function(data) {
        return new Promise((res, rej) => {
            userpostdb.update({ _id: data._id }, { $addToSet: { like: data.email } }, (err, result) => {
                if (err) {
                    console.log("err in update if", err);
                    rej('not updated');
                } else {
                    console.log(result);
                    res(result);

                }
            })
        })
    },
    reupdatepost: function(data) {
        return new Promise((res, rej) => {
            userpostdb.update({ _id: data._id }, { $pull: { like: data.email } }, (err, result) => {
                if (err) {
                    console.log("err in update if", err);
                    rej('not updated');
                } else {
                    console.log(result);
                    res(result);

                }
            })
        })
    },
    commentuser: function(data) {
        return new Promise((res, rej) => {
            userpostdb.update({ _id: data._id }, { $push: { comment: data } }, (err, result) => {
                if (err) {
                    console.log("err in cmmnt if", err);
                    rej('not updated');
                } else {
                    console.log(result);
                    res(result);

                }
            })
        })
    },

    searchpost: function(data) {
        return new Promise((res, rej) => {
            userpostdb.find({ description: { $regex: data.pattern, $options: 'i' } }, (err, result) => {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                }
            });
        });
    }
}