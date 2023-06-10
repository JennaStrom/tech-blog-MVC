const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json')
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

