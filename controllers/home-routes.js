const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');

// GET REQUESTS

// get all posts on the homepage from the database

router.get('/', (req, res)=> {
    Post.findAll({
        // what columns to include from the post table
        attributes: [
            'id',
            'post_entry',
            'title',
            'created_at',
        ],
        // the posts will be ordered by when they are created from most recent at the top
        order: [
            ['created_at', 'DESC']
        ],

        // from the user table, add the username of who created the post
        // from the comment table include all of the comments associated with that post along with the user who made the comment
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_entry', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    // load the posts onto the homepage
    .then(postData => {
        const posts = postData.map(post => post.get({plain: true}));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

// get a single post
router.get('/post/:id', (req,res)=> {
    Post.findOne({
        where: { id: req.params.id},
        attributes: [
            'id',
            'post_entry',
            'title',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_entry', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'no post exitsts with that id'});
            return;
        }
        const post = postData.get({plain: true});
        res.render('one-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

// load the login page
router.get('/login', (req, res)=> {
    // if the user is logged in, go to homepage
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // if user is not logged in login page will load
    res.render('login');
});

// load the sign-up page
router.get('/signup', (req,res)=> {
     // if the user is logged in, go to homepage
    if (req.session.loggedIn){
        res.redirect('/');
        return;
    }
    // if user is not logged in signup page will load
    res.render('/signup');
})

module.exports = router;

