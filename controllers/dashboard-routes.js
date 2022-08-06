const router = require('expres').Router();
const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth')

// load the user's posts onto their dashboard
router.get('/', withAuth, (req,res)=> {
    Post.findAll({
        where: { user_id: req.session.user_id},
        attributes: [
            'id',
            'post_entry',
            'title',
            'created_at'
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
        const posts = postData.map(post.get({plain: true}));
        res.render('dashboard', { posts, loggedIn: true});
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

// if user wants to edit one of their existing posts
router.get('edit/:id', withAuth, (req, res)=> {
    Post.findByPk(req.params.id,{
        attributes: [
            'id',
            'post_entry',
            'title',
            'created_at'
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
        if (postData){
            const post = postData.get({plain: true});
            res.render('edit-post', {
                post,
                logeedIn: true
            });
        } else {
            res.status(404).json({message: 'no post exists with that id'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;