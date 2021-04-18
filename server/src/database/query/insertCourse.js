const connection = require('../config/connection');

module.exports = (course) =>
    connection.query({
        text: `INSERT INTO course
            (source, url, title, image, rating, reviews, description, categories, date)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        values: [
            course.source,
            course.url,
            course.title,
            course.image,
            course.rating,
            course.reviews,
            course.description,
            course.categories,
            course.date,
        ],
    });
