const { isCourseFavorite } = require('../../database/query');
const authenticate = require('../user/authenticate');

async function isFavorite(req, res) {
  const token = req.cookies.user_email;
  const { user, error } = await authenticate(token);

  if (error) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    try {
      const { courseId } = req.params;
      const { rows } = await isCourseFavorite(user.id, courseId);
      if (rows[0].exists) {
        res.end();
      } else {
        res.status(404).end();
      }
    } catch ({ message }) {
      res.status(500).json({ message: 'something went wrong' });
    }
  }
}

module.exports = isFavorite;
