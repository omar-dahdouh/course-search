const connection = require('../../config/connection');

module.exports = (id) =>
  connection.query({
    text: `SELECT * FROM comment WHERE id = $1;`,
    values: [id],
  });
