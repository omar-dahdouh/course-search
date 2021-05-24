const { pageNotFound, serverError } = require('./error');
const { build } = require('../controller/database');

const updateUdemy = require('../controller/updateData/udemy');
const updateCoursera = require('../controller/updateData/coursera');
const updateEdx = require('../controller/updateData/edx');
const updateAlison = require('../controller/updateData/alison');
const updateFuturelearn = require('../controller/updateData/futurelearn');

const search = require('../controller/getData/search');
const getCourse = require('../controller/getData/getCourse');
const getCatalog = require('../controller/getData/getCatalog');

module.exports = {
  pageNotFound,
  serverError,
  build,

  updateUdemy,
  updateCoursera,
  updateEdx,
  updateAlison,
  updateFuturelearn,

  search,
  getCourse,
  getCatalog,
};
