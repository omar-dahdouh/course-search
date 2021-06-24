const connection = require('../../config/connection');

module.exports = (email) =>
  connection.query({
    text: `SELECT * FROM users WHERE email = $1;`,
    values: [email],
  });
