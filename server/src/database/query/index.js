const getUserByEmail = require('./user/getUserByEmail');
const registerUser = require('./user/registerUser');
const setAdmin = require('./user/setAdmin');

const getCourse = require('./getCourse');
const insertCourse = require('./insertCourse');
const insertCourses = require('./insertCourses');
const deleteCourses = require('./deleteCourses');
const searchCourses = require('./searchCourses');

module.exports = {
  getUserByEmail,
  registerUser,
  setAdmin,

  getCourse,
  insertCourse,
  insertCourses,
  deleteCourses,
  searchCourses,
};
