const { getAllUsers } = require('../../database/query');

async function getUsers(req, res) {
  const { rows } = await getAllUsers();

  res.json({
    users: rows,
    message: 'success',
  });
}

module.exports = getUsers;
