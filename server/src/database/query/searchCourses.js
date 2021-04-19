const connection = require('../config/connection');

module.exports = (name, offset=0) =>
    connection.query({
        text: `SELECT id, title, image, rating, reviews, source
            FROM course WHERE title ILIKE $1
            ORDER BY rating DESC OFFSET $2 LIMIT 12;`,
        values: [`%${name}%`, offset],
    });