const connection = require('../config/connection');

function getValues(courses) {
  const values = [];
  for (const course of courses) {
    values.push(
      course.url,
      course.title,
      course.image,
      course.rating,
      course.reviews,
      course.description,
      course.category,
      course.date
    );
  }

  return values;
}

function getText(courses) {
  const row = [1, 2, 3, 4, 5, 6, 7, 8];

  return courses.map(
    (course, index) => `(${row.map((v) => `$${index * 8 + v}`)})`
  );
}

module.exports = (courses) => {
  return connection.query({
    text: `INSERT INTO course
      (url, title, image, rating, reviews, description, category, date)
      VALUES ${getText(courses)};`,
    values: getValues(courses),
  });
};
