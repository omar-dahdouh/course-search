const connection = require('../../config/connection');

module.exports = (id) =>
  connection.query({
    text: 'DELETE FROM comment WHERE id = $1;',
    values: [id],
  });
