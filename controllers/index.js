const router = require('express').Router();

const signupRoutes = require('./signupRoutes');
const loginRoutes = require('./loginRoutes')
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);

module.exports = router;