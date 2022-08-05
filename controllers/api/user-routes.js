
// connect to the server
const router = require('express').Router();

// Need to access the models inorder to query their data
const {User, Post, Comment} = require('../../models');


// GET REQUESTS

// query to get all of the users
router.get('/', async (req,res)=> {
    try{  
        const userData =  await User.findAll({
        attributes: { exclude: ['password']}
    })
    res.status(200).json(userData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});


// query to get one user
router.get('/', async (req,res)=> {
    try{  
        const userData =  await User.findOne({
        attributes: { exclude: ['password']},
        where: { id: req.params.id},
        include: [
          {
            model: Post,
            attributes:['id', 'title', 'post_entry', 'create_at']
          },
          {
            model: Comment,
            attributes: ['id', 'comment_entry', 'create_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
          }
        ]
    })
    res.status(200).json(userData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// POST REQUESTS

// create a user

router.post('/', async (req, res)=> {
    try{
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

         (userData) => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json(userData)
            });
            }
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})


// user wants to login

router.post('/login', async (req,res)=> {
    User.findOne({
        where: { email: req.body.email}
    }).then (userData => {
        if (!userData) {
            res.status(400).json({message: ' no user with that email address'})
        return;
        }

        const validPassword = userData.checkPassword(req.body.password)
        if (!validPassword) {
            res.status(400).json({message: 'invalid password'})
            return;
        }

        req.session.save(()=> {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'log in success'});
        }); 
    });
});

//  user wants to logout

router.post('.login', (req, res)=> {
    if(req.session.loggedIn) {
        req.session.destroy(()=> {
            res.status(204).end();
        })
    }
    else { 
        res.status(404).end();
    }
})

// PUT REQUESTS

// user wants to update their data
router.put('/:id', (req, res) => {
    User.update(req.body, {
        idividualHooks: true,
        where: { id: req.params.id}
    })
    .then(userData => {
        if(!userData) {
            res.status(404).json({ message: 'no user found'})
            return;
        }

        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// DELETE REQEUSTS

// user wants to delete their data
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {id: req.params.id}
    })
    .then(userData => {
        if(!userData) {
            res.status(404).json({ message: 'no user found with provided information'})
            return;
        }
        res.json(userData);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json(err)
    })
})

module.exports = router;

