const connection = require('../../config/connection');

module.exports = ({
  query,
  categories,
  offset,
  limit,
  maxDate,
  ratingRange: [rateMin, rateMax],
}) =>
  connection.query({
    text: `SELECT id, title, image, rating, reviews, category,
        count(*) OVER() AS full_count
      FROM course WHERE title ILIKE $1
      AND ($2 && category)
      AND (date is null OR date <= $5) 
      AND (rating >= $6 AND rating <= $7)
      ORDER BY reviews DESC NULLS LAST
      LIMIT $4 OFFSET $3;`,
    values: [
      `%${query}%`,
      categories,
      offset,
      limit,
      maxDate, // 5
      rateMin, // 6
      rateMax, // 7
    ],
  });
