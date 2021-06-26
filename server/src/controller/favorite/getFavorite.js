const { getUserFavorite } = require('../../database/query');
const authenticate = require('../user/authenticate');

async function addFavorite(req, res) {
  const token = req.cookies.user_email;
  const { user, error } = await authenticate(token);

  if (error) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    try {
      const { rows } = await getUserFavorite(user.id);
      res.json({ courses: rows });
    } catch ({ message }) {
      res.status(500).json({ message: 'something went wrong' });
    }
  }
}

module.exports = addFavorite;
