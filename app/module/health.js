var sqlLink = require('../module/sqlLink');
var link = sqlLink.link();
var async = require('async');

var health = {
    getScore: function (id, callback) {
        link.query("select * from health where userId="+id, function (err, rows) {
            if (err) throw err;
            if (rows.length>0) callback(null, rows);
            else callback(null,null);
        });
    },
    setScore:function (score,id,callback) {
         async.waterfall([
            function (callback) {
                link.query("select * from health where userId =" + id, function (err, row) {
                    if (err) throw err;
                    if (row.length) {
                        callback(err, 1);
                    } else {
                        callback(err, 2);
                    }
                });
            },
            function (arg, callback) {
                if (arg == 1) {
                    link.query("update health set score= " + score + " where userId = " + id, function (err, result) {
                        if (result.affectedRows == 1) flag = 1;
                        callback(err, flag);
                    });
                } else {
                    link.query("insert into health (userId,score) values (" + id + "," +  score + ")", function (err, result) {
                        if (result.affectedRows == 1) flag = 1;
                        callback(err, flag);
                    });
                }
            }
        ], function (err, flag) {
            callback(null, flag);
        });
    }
}

module.exports = health;