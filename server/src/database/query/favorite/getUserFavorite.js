const connection = require('../../config/connection');

module.exports = (userId) =>
  connection.query({
    text: `SELECT course_id FROM favorite WHERE user_id = $1;`,
    values: [userId],
  });
