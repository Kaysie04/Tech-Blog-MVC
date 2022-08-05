const router = require('express').Router();
const { response } = require('express');
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth')

// GET REQUESTS

// get all posts
router.get('/', (req, res)=> {
    Post.findAll({
        attributes: [
            'id',
            'post_entry',
            'title',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_entry', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: [ 'username']
                }
            },
        {
            model: User,
            attributes: ['username']
        }
    ]
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(error)
    });
})

// get one post
router.get('/:id', (res, req)=> {
    Post.findOne({
        where: { id: req.params.id},
        attributes: [
            'id',
            'post_entry',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [ 'id', 'comment_entry', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(postData => {
        if (!postData) {
            res.status(404).json({message: 'no post exists with that id'});
            return;
        }
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// POST REQUESTS


// user wants to create a post
router.post('/', withAuth, (req, res)=> {
    Post.create({
        title: req.body.title,
        post_entry: req.body.post_entry,
        user_id: req.session.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// user wants to update a post
router.put('/:id', withAuth, (res, req) => {
    Post.update(req.body,
        {
            where: {id: req.params.id}
        }
    )
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'no post exists with that id'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// DELETE REQUESTS

// user wants to delete a post
router.delete('/:id', (req, res)=> {
    Post.destroy({
        where: {id: req.params.id}
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: ' no post exists with that id'})
            return;
        }
        res.json(postData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
  
module.exports = router;