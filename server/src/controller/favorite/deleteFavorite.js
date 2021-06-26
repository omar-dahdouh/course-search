const { deleteFromFavorite } = require('../../database/query');
const authenticate = require('../user/authenticate');

async function deleteFavorite(req, res) {
  const token = req.cookies.user_email;
  const { user, error } = await authenticate(token);

  if (error) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    try {
      const { courseId } = req.params;
      const { rowCount } = await deleteFromFavorite(user.id, courseId);
      if (rowCount === 0) {
        res.status(400).json({ message: 'failed to delete' });
      } else {
        res.json({ message: 'deleted succeffuly' });
      }
    } catch ({ message }) {
      res.status(500).json({ message: 'something went wrong' });
    }
  }
}

module.exports = deleteFavorite;
