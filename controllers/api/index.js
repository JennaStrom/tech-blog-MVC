const router = require('express').Router();

const blogRoutes =require('./blogRoutes');
const commentRoutes = require('./commentRoutes')

// all of these routes are prefixed with /api

router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router;