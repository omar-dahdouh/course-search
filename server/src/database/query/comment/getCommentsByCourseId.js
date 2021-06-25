const connection = require('../../config/connection');

module.exports = (courseId) =>
  connection.query({
    text: `SELECT comment.id, comment.content, comment.created_at,
        comment.user_id, users.name AS user_name
      FROM comment INNER JOIN users
      ON comment.user_id = users.id
      WHERE comment.course_id = $1;`,
    values: [courseId],
  });
