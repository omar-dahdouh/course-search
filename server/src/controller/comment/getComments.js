const { getCommentsByCourseId } = require('../../database/query');

async function getComments(req, res) {
  try {
    const { courseId } = req.params;
    const { rows } = await getCommentsByCourseId(courseId);
    res.json({
      comments: rows,
    });
  } catch (error) {
    res.status(500).json({
      message: 'something went wrong',
    });
  }
}

module.exports = getComments;
