const { verifyToken } = require('./token');
const { getUserByEmail } = require('../../database/query');

async function verifyUser(req, res) {
  const token = req.cookies.user_email;

  try {
    const email = await verifyToken(token);
    const {rows} = await getUserByEmail(email);

    if (rows.length !== 0) {
      const {id, name, email, is_admin} = rows[0];
      res.json({
        user: {id, name, email, is_admin},
        message: 'valid token'}
      );
    } else {
      res.status(401).json({ message: 'this account no longer exists' });
    }
  } catch (error) {
    res.status(401).json({ message: 'unauthorized' });
  }
}

module.exports = verifyUser;
