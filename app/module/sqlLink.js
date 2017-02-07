var mysql = require ('mysql');
var option = {
    host        :   'localhost',
    user        :   'root',
    password    :   '123456',
    database    :   'health'
};

var sqlLink={
    link:function(){
        return mysql.createConnection(option)
    }
}

module.exports=sqlLink;
