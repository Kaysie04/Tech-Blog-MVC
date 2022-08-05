
// needed to connect to the server
const router = require('express').Router();


// attains routes from respective files
const userRoutes =  require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes')

// route path that the api will use for endpoints
// the route path will read api/users api/posts api/comments
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);


module.exports = router;
