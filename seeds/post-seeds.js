const {Post} = require('../models')

const postData = [
    {
        title: 'What is a 400 error?',
        post_text: '400 means Bad Request. Essentially the server cannot process the request by the user.',
        user_id: 1
    },
    {
        title: 'What the heck is a Hook?',
        post_text: 'Hooks are functions that are to be called before or after another function is to be executed.',
        user_id: 2
    },
    {
        title: 'All you need to know about an API',
        post_text: 'API stands for: application programming interface',
        user_id: 3
    },
    {
        title: 'Do I really need sessions?',
        post_text: 'yes you do',
        user_id: 4
    },
    {
        title: 'How to write API routes',
        post_text: 'This is how you write API routes',
        user_id: 5
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;