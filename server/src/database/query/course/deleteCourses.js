const connection = require('../../config/connection');

module.exports = (source) =>
  connection.query({
    text: 'DELETE FROM course WHERE category[1] = $1;',
    values: [source],
  });
