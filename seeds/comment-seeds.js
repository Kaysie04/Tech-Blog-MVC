const  {Comment} = require('../models');

const commentData = [
    {
        comment_text: 'cool!',
        post_id: 5,
        user_id: 1
    },
    {
        comment_text: 'no way!',
        post_id: 4,
        user_id: 2
    },
    {
        comment_text: 'awesome sauce!',
        post_id: 3,
        user_id: 3
    },
    {
        comment_text: 'I do not think you do',
        post_id: 2,
        user_id: 4
    },
    {
        comment_text: 'that post was so informative',
        post_id: 1,
        user_id: 5
    }
];
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;