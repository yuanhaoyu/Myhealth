//not use in this version
var sqlLink = require('../module/sqlLink');
var link = sqlLink.link();

var record = {
    getRecord: function (id, callback) {
        link.query("select * from record where userId=" + id, function (err, rows) {
            if (err) throw err;
            if (rows.length > 0) callback(null, rows);
            else callback(null, 0);
        });
    },
    setRecord: function (id, record, callback) {
        link.query("insert into record (userId,record) values (" + id + ",'" + record + "')", function (err, result) {
            if (err) throw err;
            if (result.affectedRows == 1) callback(null, 1);
            else callback(null,0);
        });
    }
};

module.exports = record;