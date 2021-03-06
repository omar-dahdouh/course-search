const { pageNotFound, serverError } = require('./error');
const { build } = require('./database');

const register = require('./user/register');
const login = require('./user/login');
const logout = require('./user/logout');
const verifyUser = require('./user/verifyUser');
const adminOnly = require('./user/adminOnly');
const authenticate = require('./user/authenticate');
const { generateToken, verifyToken } = require('./user/token');
const getUsers = require('./user/getUsers');
const setAdminRole = require('./user/setAdminRole');
const removeUser = require('./user/removeUser');

const updateUdemy = require('./updateData/udemy');
const updateCoursera = require('./updateData/coursera');
const updateEdx = require('./updateData/edx');
const updateAlison = require('./updateData/alison');
const updateFuturelearn = require('./updateData/futurelearn');

const search = require('./getData/search');
const getCourse = require('./getData/getCourse');
const getCatalog = require('./getData/getCatalog');

const addComment = require('./comment/addComment');
const getComments = require('./comment/getComments');
const deleteComment = require('./comment/deleteComment');

const addFavorite = require('./favorite/addFavorite');
const deleteFavorite = require('./favorite/deleteFavorite');
const getFavorite = require('./favorite/getFavorite');
const isFavorite = require('./favorite/isFavorite');

module.exports = {
  pageNotFound,
  serverError,
  build,

  register,
  login,
  logout,
  generateToken,
  verifyToken,
  verifyUser,
  adminOnly,
  authenticate,
  getUsers,
  setAdminRole,
  removeUser,

  updateUdemy,
  updateCoursera,
  updateEdx,
  updateAlison,
  updateFuturelearn,

  search,
  getCourse,
  getCatalog,

  addComment,
  getComments,
  deleteComment,

  addFavorite,
  deleteFavorite,
  getFavorite,
  isFavorite,
};
