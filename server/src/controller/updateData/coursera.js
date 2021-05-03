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
    const subCategories = [cat, ...cat.sub];

    const jsonData = subCategories.map((sub, index) => {
      return {
        operationName: 'catalogResultQuery',
        variables: {
          start: '0',
          limit: coursePerCategory,
          facets: [
            'languages:English',
            'entityTypeTag:Courses',
            index === 0
              ? `categoryMultiTag:${sub.name}`
              : `subcategoryMultiTag:${sub.name}`,
          ],
        },
        query,
      };
    });

    const data = (await axios.post(url, jsonData)).data;

    for (const [idx, sub] of subCategories.entries()) {
      const courses = data[
        idx
      ].data.CatalogResultsV2Resource.browseV2.elements[0].courses.elements.filter(
        (course) => course.photoUrl.includes(photoPrefix)
      );

      for (const course of courses) {
        if (courseIndex.has(course.id)) {
          const index = courseIndex.get(course.id);
          courseList[index].categories.push(sub.id);
        } else {
          index = courseList.length;
          courseIndex.set(course.id, courseList.length);

          courseList.push({
            source,
            title: course.name,
            url: course.slug,
            description: course.description,
            categories: [sub.id],
            image: course.photoUrl.replace(photoPrefix, ''),
            rating: course.courseDerivativesV2.averageFiveStarRating,
            reviews: course.courseDerivativesV2.ratingCount,
            date: new Date(course.startDate).toISOString(),
          });
        }
      }
    }
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
