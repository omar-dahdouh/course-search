const axios = require('axios');

const { insertCourses, deleteCourses } = require('../../database/query');
const catalog = require('../../assets/catalog');

async function fetchData(url) {
  return (await axios.get(url)).data;
}

async function update(req, res) {
  const source = catalog[3].id;
  const categories = catalog[3].sub;

  const courseIndex = new Map();
  const courseList = [];

  const promises = categories.map((cat) => {
    const url =
      `https://api.alison.com/v0.1/search?category=${cat.name}` +
      '&language=en&size=96&page=1&order=default&locale=en';

    return fetchData(url);
  });

  const data = await Promise.all(promises);

  categories.forEach((cat, idx) => {
    const courses = data[idx].result;

    for (const course of courses) {
      if (!courseIndex.has(course.id)) {
        courseIndex.set(course.id, courseList.length);

        courseList.push({
          title: course.name,
          description:
            course.headline +
            '\n' +
            [course.category_name || '', ...(course.tags || [])]
              .join(', ')
              .replace(/_/g, ' '),
          url: course.slug,
          image: course.courseImgUrl.replace(
            'https://cdn01.alison-static.net/courses/',
            ''
          ),
          rating: course.rating,
          category: [source, cat.id],
        });
      }
    }
  });

  if (courseList.length > 0) {
    await deleteCourses(source);
    const results = await insertCourses(courseList);

    res.json({
      message: 'updated',
      rowCount: results.rowCount,
    });
  } else {
    res.json({
      message: 'error',
      rowCount: 0,
    });
  }
}

module.exports = update;
