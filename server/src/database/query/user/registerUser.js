const connection = require('../../config/connection');

module.exports = ({ name, email, password }) =>
  connection.query({
    text: `INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3) RETURNING id;`,
    values: [name, email, password],
  });
