var sqlLink = require('../module/sqlLink');
var link = sqlLink.link();
var async = require('async');
var step = {
    setStep: function(id, step, callback) {
        async.waterfall([
            function(callback) {
                link.query("select * from step where time=CURDATE() and userId=" + id, function(err, row) {
                    if (err) throw err;
                    if (row.length) {
                        callback(err, 1);
                    } else {
                        callback(err, 2);
                    }
                });
            },
            function(arg, callback) {
                if (arg == 1) {
                    link.query("update step set step= " + step + " where userId = " + id + " and time=CURDATE()", function(err, result) {
                        if (result.affectedRows == 1) var flag = 1;
                        callback(err, flag);
                    });
                } else {
                    link.query("insert into step (userId,step,time) values (" + id + "," + step + ",CURDATE())", function(err, result) {
                        if (result.affectedRows == 1) var flag = 1;
                        callback(err, flag);
                    });
                }
            }
        ], function(err, flag) {
            callback(null, flag);
        });
    },
    getTodayStep: function(id, callback) {
        link.query("select * from step where time=CURDATE() and userId=" + id, function(err, row) {
            if (err) throw err;
            if (row.length > 0) callback(null, row[0].step);
            else callback(null, null);
        });
    },
    getWeekStep: function(id, callback) {
        link.query("SELECT * FROM step where time > date_add(now(),interval -7 day) and userId=" + id + " order by id desc", function(err, rows) {
            if (err) throw err;
            if (rows.length > 0) callback(null, rows);
            else callback(null, null);
        });
    }
};

module.exports = step;
