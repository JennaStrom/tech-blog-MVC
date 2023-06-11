const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json')
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDB = async () => {
    await sequelize.sync ({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of blogData) {
        await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    
        const comments = await Comment.create(commentData, {
            returning: true,
        });
    }

    process.exit(0);
};

seedDB();