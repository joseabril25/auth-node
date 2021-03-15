const ErrorResponse = require("../utils/error.util");
var mysql = require('mysql');
var SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');
const asyncHandler = require("../middlewares/async");

var connection = mysql.createConnection({
  host: process.env.MYSQL_ROOT_HOST || '127.0.0.1',
  user: process.env.MYSQL_ROOT_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'akdfbakjnclajwcioajseic',
  database: process.env.MYSQL_DATABASE || 'prime_db',
  port: process.env.MYSQL_LOCAL_PORT || 3307
})

exports.register = asyncHandler(async (req) => {
  const { firstName, lastName, middleName, password, gender, dob, email, mobile} = req;

  const encryptPassword = SHA256(password);

  var sql = "INSERT INTO `users`(`firstName`,`lastName`,`middleName`,`bday`, `gender`, `email`, `mobile`, `password`) VALUES ('" + firstName + "','" + lastName + "','" + middleName + "','" + dob + "','" + gender + "','" + email + "','" + mobile + "','" + encryptPassword + "')";
  var checkQuery = `SELECT * FROM users WHERE email='${email}'`;

  return new Promise((resolve, reject) => {
    connection.query(checkQuery, function(error, result) {
      new ErrorResponse(error, 401)
      if(result.length > 0) {
        reject('User already exists');
      }else {
        connection.query(sql, function(error){
          if(error){
            new ErrorResponse(`You have no permission to perform this action`, 401)
          }else{
            return resolve({ firstName, lastName, middleName, gender, dob, email, mobile});
          }
        })
      }
    })
  })
}); 