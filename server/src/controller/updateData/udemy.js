const axios = require('axios');
const qs = require('querystringify');

const { insertCourses, deleteCourses } = require('../../database/query');
const catalog = require('../../assets/catalog');

const endpoint = 'https://www.udemy.com/api-2.0/discovery-units/all_courses/?';

const courseFields = [
  'id',
  'title',
  'url',
  'image_240x135',
  'description',
  'published_time',
  'rating',
  'num_reviews',
];

function makeUrl(options) {
  const props = {
    p: 1,
    page_size: 10,
    lang: 'en',
    sort: 'popularity',
    source_page: 'subcategory_page',
    locale: 'en_US',
    currency: 'usd',
    navigation_locale: 'en_US',
    sos: 'ps',
    fl: 'scat',
    skip_price: 'true',
    'fields[course]': courseFields.join(','),
    ...options,
  };

  return endpoint + qs.stringify(props);
}

async function fetchData(url) {
  return (await axios.get(url)).data;
}

async function update(req, res) {
  const courseIndex = new Map();
  const courseList = [];

  const source = catalog[0].id;
  const categories = catalog[0].sub;

  for (const cat of categories) {
    const subCategories = cat.sub;

    const promises = subCategories.map((sub) => {
      const url = makeUrl({
        subcategory: sub.name,
        subcategory_id: sub.value,
      });

      return fetchData(url);
    });

    const data = await Promise.all(promises);

    subCategories.forEach((sub, idx) => {
      const courses = data[idx].unit.items;

      for (const item of courses) {
        if (!courseIndex.has(item.id)) {
          courseIndex.set(item.id, courseList.length);
          courseList.push({
            title: item.title,
            description: item.description,
            image: (
              item.image_240x135.split('.udemycdn.com/course/240x135/')[1] || ''
            ).split('?')[0],
            url: item.url.split('/')[2],
            date: item.published_time,
            rating: item.rating,
            reviews: item.num_reviews,
            category: [source, cat.id, sub.id],
          });
        }
      }
    });
  }

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
