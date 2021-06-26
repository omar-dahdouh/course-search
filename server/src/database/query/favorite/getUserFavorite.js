const connection = require('../../config/connection');

module.exports = (userId) =>
  connection.query({
    text: `SELECT id, title, image, rating, reviews, category
        FROM course WHERE id IN
        (SELECT course_id FROM favorite WHERE user_id = $1);`,
    values: [userId],
  });
