const { verifyToken } = require('./token');
const { getUserByEmail } = require('../../database/query');

async function adminOnly(req, res, next) {
  const token = req.cookies.user_email;

  try {
    const email = await verifyToken(token);
    const {rows} = await getUserByEmail(email);

    if (rows.length !== 0) {
        if (rows[0].is_admin) {
            next();
        } else {
            res.status(401).json({
                message: 'you don\'t have permission to perform this action'
            });
        }
      
    } else {
      res.status(401).json({ message: 'this account no longer exists' });
    }
  } catch (error) {
    res.status(401).json({ message: 'unauthorized' });
  }
}

module.exports = adminOnly;
