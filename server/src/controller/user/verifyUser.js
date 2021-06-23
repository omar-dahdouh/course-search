const { verifyToken } = require('./token');
const { getUserByEmail } = require('../../database/query');

function verifyUser(req, res, next) {
  const token = req.cookies.user_email;
  console.log({ token });

  try {
    const email = verifyToken(token);
    console.log({ email });

    const {
      rows: [user],
    } = await getUserByEmail(email);

    console.log({ user });

    if (user) {
      next();
    } else {
      res.status(401).json({ message: 'this account no longer exists' });
    }
  } catch (error) {
    res.status(401).json({ message: 'unauthorized' });
  }
}

module.exports = verifyUser;
