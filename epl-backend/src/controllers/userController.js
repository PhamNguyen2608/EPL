const DEFAULT_LIMIT = 5;

const { getUsers } = require('../models/userModel');

const getUserList = async (req, res) => {
  const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const { users, total } = await getUsers(limit, offset);

  const hasNext = offset + limit < total;
  const hasPrevious = offset !== 0;

  res.json({
    _links: {
      self: { href: `http://localhost:3000/users?page=${page}` },
      first: { href: `http://localhost:3000/users?page=1` },
      prev: hasPrevious ? { href: `http://localhost:3000/users?page=${page - 1}` } : null,
      next: hasNext ? { href: `http://localhost:3000/users?page=${page + 1}` } : null,
      last: { href: `http://localhost:3000/users?page=${Math.ceil(total / limit)}` }
    },
    count: users.length,
    total,
    _embedded: {
      users: users.map(user => ({
        _links: {
          self: { href: `http://localhost:3000/users/${user.id}` }
        },
        ...user
      }))
    }
  });
};

module.exports = { getUserList };
