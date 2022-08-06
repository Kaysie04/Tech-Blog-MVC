// needed to connect to the server
const router = require('express').Router();

// attains routes from respective files
const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

// route path that the api will use for endpoints
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes)
router.use('/api', apiRoutes);

// if a route does not exist, server will throw error
router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;