const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2608nguyen',
  database: 'eplDB'
});

module.exports = db;
