const connection = require('../../config/connection');

module.exports = ({ content, userId, courseId }) =>
  connection.query({
    text: `INSERT INTO comment (content, user_id, course_id)
        VALUES ($1, $2, $3) RETURNING *;`,
    values: [content, userId, courseId],
  });
