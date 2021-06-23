const connection = require('../../config/connection');

module.exports = (id, isAdmin) =>
  connection.query({
    text: `UPDATE users SET is_admin = $2 WHERE id = $1;`,
    values: [id, isAdmin],
  });
