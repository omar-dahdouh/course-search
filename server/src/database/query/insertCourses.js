const connection = require('../config/connection');

function getValues(courses) {
    const values = [];
    for (const course of courses) {
        values.push(
            course.source,
            course.url,
            course.title,
            course.image,
            course.rating,
            course.reviews,
            course.description,
            course.categories,
            course.date,
        );
    }

    return values;
};

function getText(courses) {
    const row = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return courses.map((course, index) =>
        `(${row.map(v => `$${index * 9 + v}`)})` );
};

module.exports = (courses) => {
    return connection.query({
        text: `INSERT INTO course
            (source, url, title, image, rating, reviews, description, categories, date)
            VALUES ${getText(courses)};`,
        values: getValues(courses),
    });
}
