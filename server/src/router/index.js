const router = require('express').Router();

const {
  pageNotFound,
  serverError,
  build,

  register,
  login,
  logout,
  verifyUser,
  adminOnly,

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
} = require('../controller');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verifyUser', verifyUser);

router.put('/build', adminOnly, build);

router.use('/update', adminOnly);
router.put('/update/udemy', updateUdemy);
router.put('/update/coursera', updateCoursera);
router.put('/update/edx', updateEdx);
router.put('/update/alison', updateAlison);
router.put('/update/futurelearn', updateFuturelearn);

router.get('/getCatalog', getCatalog);
router.post('/search', search);
router.get('/course/:id', getCourse);

router.post('/comment', addComment);
router.get('/comments/:courseId', getComments);
router.delete('/comment/:commentId', deleteComment);

router.use(pageNotFound);
router.use(serverError);

module.exports = router;
