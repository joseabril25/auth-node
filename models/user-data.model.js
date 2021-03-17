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

exports.getData = asyncHandler(async () => {
  var sql = `SELECT * FROM users`;
  
  return new Promise((resolve, reject) => {
    connection.query(sql, function(error, result){
      if(error){
        new ErrorResponse(`Invalid login credentials`, 401)
      }else{
        if(result.length > 0) {
          const data = {
            totalUsers: result.length,
            totalFemale: result.filter(i => i.gender === 'Female').length,
            totalMale: result.filter(i => i.gender === 'Male').length,
            activeUsers: result.filter(i => i.active === 1).length,
            inactiveUsers: result.filter(i => i.active === 0).length,
            emailUsers: result.filter(i => i.email).length,
            mobileUsers: result.filter(i => i.mobile).length,
          }
          return resolve({...data});
        } else {
          return reject('User does not exist');
        }
      }
    })
  })
}); 


exports.getAllUser = asyncHandler(async () => {
  var sql = `SELECT * FROM users`;
  
  return new Promise((resolve, reject) => {
    connection.query(sql, function(error, result){
      if(error){
        new ErrorResponse(`Invalid login credentials`, 401)
      }else{
        if(result.length > 0) {
          return resolve(result);
        } else {
          return reject('User does not exist');
        }
      }
    })
  })
}); 