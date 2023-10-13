const express = require('express');
const { Connection, Request } = require('tedious');

const app = express();
const config = {
  server: 'ADMIN', 
  authentication: {
    type: 'default',
    options: {
      userName: 'Admin', 
      password: '' 
    }
  },
  options: {

    encrypt: true,
    database: 'EplDB' 
  }
};

let isConnected = false;
const connection = new Connection(config);

connection.on('connect', function(err) {
  if (err) {
    console.error('Error connecting: ' + err.message);
    isConnected = false;
  } else {
    console.log('Connected to SQL Server successfully');
    isConnected = true;
  }
});

function executeSQL(callback) {
  const request = new Request("SELECT * FROM users", function(err, rowCount) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rowCount + ' rows returned');
    }
  });
  connection.execSql(request);
}

app.get('/users', (req, res) => {
  if (isConnected) {
    executeSQL((err, data) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ data: data });
      }
    });
  } else {
    res.status(500).json({ error: 'Not connected to SQL Server' });
  }
});

const PORT = 8000;

// Kết nối đến SQL Server trước khi bắt đầu lắng nghe
connection.connect(err => {
  if (err) {
    console.error('Could not start server because SQL connection failed', err);
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
