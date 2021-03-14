var mysql = require('mysql')

var connection = mysql.createConnection({
  host: process.env.MYSQL_ROOT_HOST || '127.0.0.1',
  user: process.env.MYSQL_ROOT_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'akdfbakjnclajwcioajseic',
  database: process.env.MYSQL_DATABASE || 'prime_db',
  port: process.env.MYSQL_LOCAL_PORT || 3307
})

const connectMySqlDb = async () => {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    const createTable = `CREATE TABLE IF NOT EXISTS users (
        id INT(11) PRIMARY KEY AUTO_INCREMENT, 
        firstName VARCHAR(255), 
        lastName VARCHAR(255), 
        middleName VARCHAR(255),
        bday VARCHAR(255),
        gender VARCHAR(255),  
        email VARCHAR(255),  
        password VARCHAR(255),
        mobile VARCHAR(255)
      )`;
  
    console.log('connected as id ' + connection.threadId);
    connection.query(createTable, function(error, result){
      if(error) console.log('Table error!', error) ;
      console.log('Table is created!')
    })
  });
};

module.exports = connectMySqlDb