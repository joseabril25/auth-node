const ErrorResponse = require("../utils/error.util");
var mysql = require('mysql');
const asyncHandler = require("../middlewares/async");

var connection = mysql.createConnection({
  host: process.env.MYSQL_ROOT_HOST || '127.0.0.1',
  user: process.env.MYSQL_ROOT_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'akdfbakjnclajwcioajseic',
  database: process.env.MYSQL_DATABASE || 'prime_db',
  port: process.env.MYSQL_LOCAL_PORT || 3307
})

exports.checkUser = asyncHandler(async (email) => {
  var sql = `SELECT * FROM users WHERE email='${email}'`;
  
  return new Promise((resolve, reject) => {
    connection.query(sql, function(error, result){
      console.log("🚀 ~ file: user.model.js ~ line 18 ~ connection.query ~ error", error)
      if(error){
        new ErrorResponse(`Invalid login credentials`, 401)
      }else{
        if(result.length > 0) {
          return resolve('User exists');
        } else {
          return reject('User does not exist');
        }
      }
    })
  })
}); 