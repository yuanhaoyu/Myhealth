var sqlLink = require('../module/sqlLink');
var link = sqlLink.link();

var sleep = {
    getSleep: function (id, callback) {
        link.query("select * from sleep where userId="+id+"and time=CURDATE()", function (err, rows) {
            if (err) throw err;
            if (rows.length>0) callback(null, rows);
            else callback(null,null);
        });
    },
    getWeekSleep:function (id, callback) {
        link.query("SELECT * FROM sleep where time > date_add(now(),interval -7 day) and userId="+id, function (err, rows) {
            if (err) throw err;
            if (rows.length>0) callback(null, rows);
            else callback(null,null);
        });        
    }
}

module.exports = sleep;