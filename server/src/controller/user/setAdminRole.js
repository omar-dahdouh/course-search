const { setAdmin } = require('../../database/query');
const authenticate = require('../user/authenticate');

async function setAdminRole(req, res) {
  const token = req.cookies.user_email;
  const { user } = await authenticate(token);
  const { userId, status } = req.body;

  if (user.id == userId) {
    res.status(401).json({ message: "you can't change your own role" });
  } else {
    try {
      const { rowCount } = await setAdmin(userId, status);
      res.json({ message: 'succefful', count: rowCount });
    } catch ({ message }) {
      res.status(500).json({ message: 'something went wrong' });
    }
  }
}

module.exports = setAdminRole;
