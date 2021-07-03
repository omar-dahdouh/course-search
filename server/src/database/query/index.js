const getUserByEmail = require('./user/getUserByEmail');
const registerUser = require('./user/registerUser');
const setAdmin = require('./user/setAdmin');
const getAllUsers = require('./user/getAllUsers');
const deleteUser = require('./user/deleteUser');

const getCourse = require('./course/getCourse');
const insertCourse = require('./course/insertCourse');
const insertCourses = require('./course/insertCourses');
const deleteCourses = require('./course/deleteCourses');
const searchInTitle = require('./course/searchInTitle');
const searchInDescription = require('./course/searchInDescription');

const insertComment = require('./comment/insertComment');
const deleteCommentById = require('./comment/deleteCommentById');
const getCommentById = require('./comment/getCommentById');
const getCommentsByCourseId = require('./comment/getCommentsByCourseId');

const addToFavorite = require('./favorite/addToFavorite');
const deleteFromFavorite = require('./favorite/deleteFromFavorite');
const getUserFavorite = require('./favorite/getUserFavorite');
const isCourseFavorite = require('./favorite/isCourseFavorite');

module.exports = {
  getUserByEmail,
  registerUser,
  setAdmin,
  getAllUsers,
  deleteUser,

  getCourse,
  insertCourse,
  insertCourses,
  deleteCourses,
  searchInTitle,
  searchInDescription,

  insertComment,
  deleteCommentById,
  getCommentById,
  getCommentsByCourseId,

  addToFavorite,
  deleteFromFavorite,
  getUserFavorite,
  isCourseFavorite,
};
