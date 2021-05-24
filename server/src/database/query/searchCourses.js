const connection = require('../config/connection');

module.exports = ({ query, category, offset, limit }) =>
  connection.query({
    text: `SELECT id, title, image, rating, reviews, category,
        count(*) OVER() AS full_count
      FROM course WHERE title ILIKE $1
      AND ($2 = 0 OR $2 = ANY(category))
      ORDER BY reviews DESC NULLS LAST
      LIMIT $4 OFFSET $3;`,
    values: [`%${query}%`, category, offset, limit],
    asd: console.log({ query, category, offset, limit }),
  });
