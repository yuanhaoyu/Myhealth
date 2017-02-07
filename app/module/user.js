var sqlLink = require('../module/sqlLink');
var link = sqlLink.link();
var async=require('async');

var user = {
    login: function (name, psw, callback) {
        link.query("select * from user where username ='" + name + "'", function (err, rows) {
            if (err) throw err;
            var data={};
            if (rows.length>0) {
                if (rows[0].password == psw) {
                    data.flag=1;
                    data.userId=rows[0].id;
                    callback(null, data);
                }
                else {
                    data.flag=0;
                    callback(null, data);
                }
            }
            else {
                data.flag=0;
                callback(null, data);
            }
        });
    },
    register: function (name, psw, callback) {
        async.waterfall([
            function (callback) {
                link.query("select * from user where username='" + name + "'", function (err, row) {
                    if (err) throw err;

                    if (row.length > 0) {
                        if (row[0].username == name) callback(err, 0);
                    }
                     else callback(err, 1);
                });
            },
            function (arg, callback) {
                if (arg == 0) {
                    //username have
                    callback(null, 3);
                } else {
                    link.query("insert into user (username,password) values ('" + name + "','" + psw + "')", function (err, result) {
                        if (result.affectedRows == 1) callback(err, 1);
                        else callback(err,0);
                    });
                }
            }
        ], function (err, flag) {
            callback(null, flag);
        });
    }
};

module.exports = user;