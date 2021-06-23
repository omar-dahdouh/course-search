const { pageNotFound, serverError } = require('./error');
const { build } = require('./database');

const register = require('./user/register');
const login = require('./user/login');
const verifyUser = require('./user/login');
const { generateToken, verifyToken } = require('./user/token');

const updateUdemy = require('./updateData/udemy');
const updateCoursera = require('./updateData/coursera');
const updateEdx = require('./updateData/edx');
const updateAlison = require('./updateData/alison');
const updateFuturelearn = require('./updateData/futurelearn');

const search = require('./getData/search');
const getCourse = require('./getData/getCourse');
const getCatalog = require('./getData/getCatalog');

module.exports = {
  pageNotFound,
  serverError,
  build,

  register,
  login,
  generateToken,
  verifyToken,
  verifyUser,

  updateUdemy,
  updateCoursera,
  updateEdx,
  updateAlison,
  updateFuturelearn,

  search,
  getCourse,
  getCatalog,
};
