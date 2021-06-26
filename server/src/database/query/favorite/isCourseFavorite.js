const connection = require('../../config/connection');

module.exports = (userId, courseId) =>
  connection.query({
    text: `SELECT EXISTS(SELECT 1 FROM favorite WHERE user_id = $1 AND course_id = $2);`,
    values: [userId, courseId],
  });
