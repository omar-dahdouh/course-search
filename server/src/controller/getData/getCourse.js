const getCourse = require('../../database/query/getCourse');

async function course(req, res) {
  const { id } = req.params;

  const { rows } = await getCourse(id);

  if (rows.length === 0) {
    res.status(404).json({
      id,
      message: 'course not found',
    });
  } else {
    res.json({
      id,
      message: 'course found',
      course: rows[0],
    });
  }
}

module.exports = course;
