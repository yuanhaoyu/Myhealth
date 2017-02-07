//not use in this version
var sqlLink = require('../module/sqlLink');
var link = sqlLink.link();

var task = {
    getTask: function (id, callback) {
        link.query("select * from task where userId=" + id, function (err, rows) {
            if (err) throw err;
            if (rows.length > 0) callback(null, rows);
            else callback(null, null);
        });
    },
    setTask: function (id, task, callback) {
        link.query("insert into task (userId,task) values (" + id + ",'" + task + "')", function (err, result) {
            if (err) throw err;
            if (result.affectedRows == 1) callback(null, 1);
            else callback(null, 0);
        });
    },
    delTask: function (taskId, callback) {
        link.query("delete from task where id =" + taskId, function (err, result) {
            if (err) throw err;
            if (result.affectedRows == 1) callback(null, 1);
            else callback(null, 0);
        });
    }
};

module.exports = task;