const { deleteUser } = require('../../database/query');
const authenticate = require('../user/authenticate');

async function removeUser(req, res) {
  const token = req.cookies.user_email;
  const { user } = await authenticate(token);
  const { userId } = req.params;

  if (user.id == userId) {
    res.status(401).json({ message: "you can't remove your own user" });
  } else {
    try {
      const { rowCount } = await deleteUser(userId);
      res.json({ message: 'succefful', count: rowCount });
    } catch ({ message }) {
      res.status(500).json({ message: 'something went wrong' });
    }
  }
}

module.exports = removeUser;
