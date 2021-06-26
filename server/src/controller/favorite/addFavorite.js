const { addToFavorite } = require('../../database/query');
const authenticate = require('../user/authenticate');

async function addFavorite(req, res) {
  const token = req.cookies.user_email;
  const { user, error } = await authenticate(token);

  if (error) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    try {
      const { courseId } = req.params;
      const { rowCount } = await addToFavorite(user.id, courseId);
      if (rowCount === 0) {
        res.status(400).json({ message: 'failed to add' });
      } else {
        res.json({ message: 'added succeffuly' });
      }
    } catch ({ message }) {
      res.status(500).json({ message: 'something went wrong' });
    }
  }
}

module.exports = addFavorite;
