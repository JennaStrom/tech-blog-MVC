const router = require('express').Router();

const userRoutes = require('./userRoutes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/login', userRoutes);
router.use('/signup', userRoutes);

module.exports = router;