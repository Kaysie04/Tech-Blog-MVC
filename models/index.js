// IMPORT ALL MODELS

const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');


// CREATE ASSOCIATIONS

// USER TO POST RELATIONSHIP
User.hasMany(Post,{
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// COMMENT TO USER RELATIONSHIP
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

//COMMENT TO POST RELATIONSHIP
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

//USER TO COMMENT RELATIONSHIP
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});


// POST TO COMMENT RELATIONSHIP
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };