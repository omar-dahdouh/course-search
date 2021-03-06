const axios = require('axios');

const { insertCourses, deleteCourses } = require('../../database/query');
const catalog = require('../../assets/catalog');

async function fetchData(url) {
  const res = await axios.get(url, {
    headers: {
      accept: 'application/json',
      'x-requested-with': 'XMLHttpRequest',
    },
  });

  return res.data;
}

async function update(req, res) {
  const source = catalog[4].id;
  const categories = catalog[4].sub;

  const courseList = [];

  const promises = categories.map((cat) => {
    const url =
      `https://www.futurelearn.com/courses?filter_category=${cat.value}` +
      '&filter_course_type=unlimited&filter_availability=started&all_courses=1';

    return fetchData(url);
  });

  const data = await Promise.all(promises);

  categories.forEach((cat, idx) => {
    const courses = data[idx].cards.filter((x) => x.path).slice(0, 96);

    for (const course of courses) {
      courseList.push({
        title: course.title,
        description: course.introduction,
        url: course.path.replace('/courses/', ''),
        image: course.imageUrl.replace(
          'https://ugc.futurelearn.com/uploads/images/',
          ''
        ),
        rating: course.averageReviewScore,
        reviews: course.totalReviews,
        category: [source, cat.id],
      });
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
