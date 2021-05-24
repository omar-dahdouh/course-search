const connection = require('../config/connection');

module.exports = (course) =>
  connection.query({
    text: `INSERT INTO course
        (url, title, image, rating, reviews, description, category, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    values: [
      course.url,
      course.title,
      course.image,
      course.rating,
      course.reviews,
      course.description,
      course.category,
      course.date,
    ],
  });
