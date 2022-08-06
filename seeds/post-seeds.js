const {Post} = require('../models')

const postData = [
    {
        title: 'What is a 400 error?',
        post_entry: '400 means Bad Request. Essentially the server cannot process the request by the user.',
        user_id: 1
    },
    {
        title: 'What the heck is a Hook?',
        post_entry: 'Hooks are functions that are to be called before or after another function is to be executed.',
        user_id: 2
    },
    {
        title: 'All you need to know about an API',
        post_entry: 'API stands for: application programming interface. APIs are what allow two computers to talk to each other in order to exchange data and functionalities. It is a set of programming code that enables data transmission between one software product and another',
        user_id: 3
    },
    {
        title: 'Do I really need sessions?',
        post_entry: 'yes you do',
        user_id: 4
    },
    {
        title: 'How to write API routes',
        post_entry: 'This is how you write API routes',
        user_id: 5
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;