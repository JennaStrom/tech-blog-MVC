const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.username
        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    console.log('something')
    try {
        const blogData = await Blog.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }]
        });
        const blogs = blogData.map((blog) => blog.get({
            plain: true
        }));
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
	try {
		const blogData = await Blog.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				}, {
					model: Comment,
					include: [
						User
					]
				}
			],
		});

		const blog = blogData.get({
			plain: true
		});

		res.render('blog', {
			...blog,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: '404 Blog not found' });
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;