const db = require('../database/dbConnection');

const getUsers = async (limit, offset) => {
  const [users] = await db.query('SELECT * FROM users LIMIT ? OFFSET ?', [limit, offset]);
  const [total] = await db.query('SELECT COUNT(*) as total FROM users');

  return { users, total: total[0].total };
};

module.exports = { getUsers };
