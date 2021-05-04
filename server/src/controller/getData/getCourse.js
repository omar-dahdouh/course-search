const getCourse = require('../../database/query/getCourse');
const { categoryName, categoryPath } = require('../../assets/catalogIndex');
const { sourceImage, sourceLink } = require('../../assets/sourceInfo');

async function course(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await getCourse(id);

    if (rows.length === 0) {
      res.status(404).json({
        id,
        message: 'not found',
      });
    } else {
      const [course] = rows;
      const source = categoryName.get(course.source);

      res.json({
        id,
        message: 'found',
        course: {
          ...course,
          source,
          categories: course.categories.map(categoryPath),
          image: sourceImage[source](course.image),
          url: sourceLink[source](course.url),
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      id,
      message: 'error',
    });
  }
}

module.exports = course;
