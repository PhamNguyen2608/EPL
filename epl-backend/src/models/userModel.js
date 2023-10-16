const db = require('../database/dbConnection');

const getUsers = async (limit, offset, keyword, strSort) => {
    if (strSort === undefined || !strSort) {
        strSort = 'id:desc';
    }
    const [field, direction] = strSort.split(':'); // id:desc
    const [users] = await db.query(`SELECT * FROM users ORDER BY ${field} ${direction} LIMIT ? OFFSET ? `, [limit, offset]);
    const [total] = await db.query('SELECT COUNT(*) as total FROM users');

  return { users, total: total[0].total };
};

module.exports = { getUsers };
