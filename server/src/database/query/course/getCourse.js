const connection = require('../../config/connection');

module.exports = (id) =>
  connection.query({
    text: `SELECT * FROM course WHERE id = $1;`,
    values: [id],
  });
