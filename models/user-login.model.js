const ErrorResponse = require("../utils/error.util");
var mysql = require('mysql');
var SHA256 = require("crypto-js/sha256");
const asyncHandler = require("../middlewares/async");

var connection = mysql.createConnection({
  host: process.env.MYSQL_ROOT_HOST || '127.0.0.1',
  user: process.env.MYSQL_ROOT_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'akdfbakjnclajwcioajseic',
  database: process.env.MYSQL_DATABASE || 'prime_db',
  port: process.env.MYSQL_LOCAL_PORT || 3307
})

exports.login = asyncHandler(async (req) => {
  console.log('go to login shit')
  const { email, password } = req;

  const encryptPassword = SHA256(password);

  var sql = `SELECT * FROM users WHERE email='${email}' and password='${encryptPassword}'`;
  
  return new Promise((resolve, reject) => {
    connection.query(sql, function(error, result){
      if(error){
        new ErrorResponse(`Invalid login credentials`, 401)
      }else{
        if(result.length > 0) {
          delete result[0].password;
          return resolve({...result[0]});
        } else {
          return reject('User does not exist');
        }
      }
    })
  })
}); 