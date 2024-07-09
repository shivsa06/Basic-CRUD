const mysql = require ('mysql');

let connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,
    database: 'crudapp',
    user: 'root',
    password: 'root',
  });
  
  connection.connect (error => {
    if (error) {
      console.log ('Unable to Connect');
    } else {
      console.log ('Successfully connected to Database');
    }
  });

module.exports = connection;