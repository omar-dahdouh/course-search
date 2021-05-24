const axios = require('axios');

const { insertCourses, deleteCourses } = require('../../database/query');
const catalog = require('../../assets/catalog');

async function update(req, res) {
  const photoPrefix =
    'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/' +
    'https://coursera-course-photos.s3.amazonaws.com/';

  const coursePerCategory = 24;
  const url = 'https://www.coursera.org/graphqlBatch?opname=catalogResultQuery';
  const query = `query catalogResultQuery(
        $facets: [String!]!, $start: String!, $limit: Int
    ) {
        CatalogResultsV2Resource {
            browseV2(facets: $facets, start: $start, limit: $limit) {
                elements {
                    courses {
                        elements {
                            id, slug, name, photoUrl, description, startDate,
                            courseDerivativesV2 { averageFiveStarRating, ratingCount }
                        }
                    }
                }
            }
        }
    }
    `;

  const courseIndex = new Map();
  const courseList = [];

  const source = catalog[1].id;
  const categories = catalog[1].sub;

  for (const cat of categories) {
    const subCategories = cat.sub;

    const jsonData = subCategories.map((sub) => {
      return {
        operationName: 'catalogResultQuery',
        variables: {
          start: '0',
          limit: coursePerCategory,
          facets: [
            'languages:English',
            'entityTypeTag:Courses',
            `subcategoryMultiTag:${sub.name}`,
          ],
        },
        query,
      };
    });

    const data = (await axios.post(url, jsonData)).data;

    subCategories.forEach((sub, idx) => {
      const courses = data[
        idx
      ].data.CatalogResultsV2Resource.browseV2.elements[0].courses.elements.filter(
        (course) => course.photoUrl.includes(photoPrefix)
      );

      for (const course of courses) {
        if (!courseIndex.has(course.id)) {
          courseIndex.set(course.id, courseList.length);
          courseList.push({
            title: course.name,
            url: course.slug,
            description: course.description,
            category: [source, cat.id, sub.id],
            image: course.photoUrl.replace(photoPrefix, ''),
            rating: course.courseDerivativesV2.averageFiveStarRating,
            reviews: course.courseDerivativesV2.ratingCount,
            date: new Date(course.startDate).toISOString(),
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
