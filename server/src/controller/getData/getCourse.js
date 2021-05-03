const getCourse = require('../../database/query/getCourse');
const { categoryName, categoryPath } = require('../../assets/catalogIndex');

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

      res.json({
        id,
        message: 'found',
        course: {
          ...course,
          source: categoryName.get(course.source),
          categories: course.categories.map(categoryPath),
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
