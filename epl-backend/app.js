const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Khởi tạo kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2608nguyen',
  database: 'EplDB'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});


app.get('/users', (req, res) => {
  const limit = parseInt(req.query.limit) || 10; 
  const cursor = parseInt(req.query.cursor); 

  let query = 'SELECT * FROM `users` WHERE `id` > ? LIMIT ?';
  
  db.query(query, [cursor || 0, limit], (err, results) => {
    if (err) {
      console.error('Lỗi khi truy vấn:', err);
      res.status(500).json({ error: 'Database query error' });
      return;
    }

    const nextCursor = results.length > 0 ? results[results.length - 1].id : null;

    res.json({
      data: results,
      meta: {
        nextCursor
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
