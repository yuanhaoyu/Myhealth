var sqlLink = require('../module/sqlLink');
var link = sqlLink.link();
var async = require('async');
var date = new Date();

var today = {
    getDate: function () {
        var dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return dateStr;
    },
    getWeek: function () {
        var week;
        var weekStr = date.getDay();      
        switch(weekStr){
            case 1: 
                week = "星期一";
                break;
            case 2: 
                week = "星期二";
                break;
            case 3: 
                week = "星期三";
                break;
            case 4: 
                week = "星期四";
                break;
            case 5: 
                week = "星期五";
                break;
            case 6: 
                week = "星期六";
                break;
            case 0: 
                week = "星期日";
                break;
        }
        return week;
    },
    getTime: function () {
        var timeStr = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return timeStr;
    },
    getLogion: function (callback) {
        link.query("select * from logion order by rand() limit 1", function (err, rows) {
            if (err) throw err;
            if (rows) callback(null, rows);
        });
    }
}

module.exports = today;