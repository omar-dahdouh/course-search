const connection = require('../../config/connection');

module.exports = () =>
  connection.query({
    text: `SELECT id, name, email, is_admin FROM users ORDER BY id;`,
    values: [],
  });
