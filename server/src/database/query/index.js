const getUserByEmail = require('./user/getUserByEmail');
const registerUser = require('./user/registerUser');
const setAdmin = require('./user/setAdmin');

const getCourse = require('./course/getCourse');
const insertCourse = require('./course/insertCourse');
const insertCourses = require('./course/insertCourses');
const deleteCourses = require('./course/deleteCourses');
const searchCourses = require('./course/searchCourses');

const insertComment = require('./comment/insertComment');

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
};
