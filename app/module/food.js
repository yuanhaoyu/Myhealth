//not use in this version

var sqlLink = require('../module/sqlLink');
var link = sqlLink.link();

var food={
    getFood:function(id,callback) {
        link.query("select top 5 from food where userId=" + id+"and order by time desc", function (err, rows) {
            if (err) throw err;
            if (rows.length > 0) callback(null, rows);
            else callback(null, 0);
        });
    },
    setFood:function (id,food,score,callback) {
        link.query("insert into food (userId,food,score) values (" + id + ",'" + food + "',"+score+")", function (err, result) {
            if (err) throw err;
            if (result.affectedRows == 1) callback(null, 1);
            else callback(null,0);
        });
    }
};
module.exports=food;