var sqlLink = require('../module/sqlLink');
var async = require('async');
var link = sqlLink.link();


var body = {
    getBody: function (id, callback) {
        link.query("select * from body where userId =" + id, function (err, row) {
            if (err) throw err;
            if (row) callback(null, row);
        });
    },
    setHeight: function (id, height, callback) {
        async.waterfall([
            function (callback) {
                link.query("select * from body where userId =" + id, function (err, row) {
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
                    link.query("update body set height = " + height + " where userId = " + id, function (err, result) {
                        if (err) throw err;
                        if (result.affectedRows == 1) callback(err, 1);
                    });
                } else {
                    link.query("insert into body (userId,height) values (" + id + "," + height + ")", function (err, result) {
                        if (err) throw err;
                        if (result.affectedRows == 1) callback(err, 1);
                    });
                }
            }
        ], function (err, flag) {
            callback(null, flag);
        });
    },
    setWeight: function (id, weight, callback) {
        async.waterfall([
            function (callback) {
                link.query("select * from body where userId =" + id, function (err, row) {
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
                    link.query("update body set weight = " + weight + " where userId = " + id, function (err, result) {
                        if (result.affectedRows == 1) flag = 1;
                        callback(err, flag);
                    });
                } else {
                    link.query("insert into body (userId,weight) values (" + id + "," + weight + ")", function (err, result) {
                        if (result.affectedRows == 1) flag = 1;
                        callback(err, flag);
                    });
                }
            }
        ], function (err, flag) {
            callback(null, flag);
        });
    },
    setAge: function (id, age, callback) {
        async.waterfall([
            function (callback) {
                link.query("select * from body where userId =" + id, function (err, row) {
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
                    link.query("update body set age = " + age + " where userId = " + id, function (err, result) {
                        if (result.affectedRows == 1) flag = 1;
                        callback(err, flag);
                    });
                } else {
                    link.query("insert into body (userId,age) values (" + id + "," + age + ")", function (err, result) {
                        if (result.affectedRows == 1) flag = 1;
                        callback(err, flag);
                    });
                }
            }
        ], function (err, flag) {
            callback(null, flag);
        });
    },
    setBody: function (id, name, height, weight, age, sex, callback) {
        async.waterfall([
            function (callback) {
                link.query("select * from body where userId =" + id, function (err, row) {
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
                    link.query("update body set name= '" + name + "', height=" + height + ", weight=" + weight + ", age = " + age + ",sex='" + sex + "' where userId = " + id, function (err, result) {
                        if (result.affectedRows == 1) flag = 1;
                        callback(err, flag);
                    });
                } else {
                    link.query("insert into body (userId,name,height,weight,age,sex) values (" + id + "," + "'" + name + "'," + height + "," + weight + "," + age + ",'" + sex + "')", function (err, result) {
                        if (result.affectedRows == 1) flag = 1;
                        callback(err, flag);
                    });
                }
            }
        ], function (err, flag) {
            callback(null, flag);
        });
    }
};

module.exports = body;