const authenticate = require('./authenticate');

async function verifyUser(req, res) {
  const token = req.cookies.user_email;
  const { user, error } = await authenticate(token);

  if (error) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    res.json({
      user,
      message: 'authorized',
    });
  }
}

module.exports = verifyUser;
