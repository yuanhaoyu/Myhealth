var sqlLink = require('../module/sqlLink');
var link = sqlLink.link();
var async = require('async');

var edweight = {
    getTodayWeight: function (id, callback) {
        link.query("select * from edweight where time=CURDATE() and userId="+id, function (err, rows) {
            if (err) throw err;
            if (rows.length>0) callback(null, rows);
            else callback(null,null);
        });
    },
    getWeekWeight:function(id,callback){
        link.query("SELECT * FROM edweight where time > date_add(now(),interval -7 day) and userId="+id+" order by id desc", function (err, rows) {
            if (err) throw err;
            if (rows.length>0) callback(null, rows);
            else callback(null,null);
        });
    },
    setTodayWeight:function (id,weight,callback) {
        async.waterfall([
            function (callback) {
                link.query("select * from edweight where time=CURDATE() and userId="+id, function (err, row) {
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
                    link.query("update edweight set weight= " + weight + " where userId = " + id+ " and time=CURDATE()", function (err, result) {
                        if (result.affectedRows == 1) flag = 1;
                        callback(err, flag);
                    });
                } else {
                    link.query("insert into edweight (userId,weight,time) values (" + id + "," +  weight + ",CURDATE())", function (err, result) {
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

module.exports = edweight;
