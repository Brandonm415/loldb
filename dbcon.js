var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'us-cdbr-iron-east-05.cleardb.net',
  user            : 'bbc569c80c1acb',
  password        : '824e4ed8',
  database        : 'heroku_f85d60ae00539c1'
});
module.exports.pool = pool;
