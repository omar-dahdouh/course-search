const router = require('express').Router();

const {
    pageNotFound,
    serverError,
    build,
    updateUdemy,
    updateCoursera,
    updateEdx,
    updateAlison,
    updateFuturelearn,
} = require('../controller');

router.get('/build', build);
router.get('/updateUdemy', updateUdemy);
router.get('/updateCoursera', updateCoursera);
router.get('/updateEdx', updateEdx);
router.get('/updateAlison', updateAlison);
router.get('/updateFuturelearn', updateFuturelearn);

router.use(pageNotFound);
router.use(serverError);

module.exports = router;
