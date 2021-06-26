const getUserByEmail = require('./user/getUserByEmail');
const registerUser = require('./user/registerUser');
const setAdmin = require('./user/setAdmin');

const getCourse = require('./course/getCourse');
const insertCourse = require('./course/insertCourse');
const insertCourses = require('./course/insertCourses');
const deleteCourses = require('./course/deleteCourses');
const searchCourses = require('./course/searchCourses');

const insertComment = require('./comment/insertComment');
const deleteCommentById = require('./comment/deleteCommentById');
const getCommentById = require('./comment/getCommentById');
const getCommentsByCourseId = require('./comment/getCommentsByCourseId');

const addToFavorite = require('./favorite/addToFavorite');
const deleteFromFavorite = require('./favorite/deleteFromFavorite');
const getUserFavorite = require('./favorite/getUserFavorite');

module.exports = {
  getUserByEmail,
  registerUser,
  setAdmin,

  getCourse,
  insertCourse,
  insertCourses,
  deleteCourses,
  searchCourses,

  insertComment,
  deleteCommentById,
  getCommentById,
  getCommentsByCourseId,

  addToFavorite,
  deleteFromFavorite,
  getUserFavorite,
};
