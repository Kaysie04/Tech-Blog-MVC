const {User} = require('../models');

const userData = [
    {
        username: 'Kaysie22',
        email: 'kaysie@gmail.com',
        password: 'password'
    },
    {
        username: 'Temple23',
        email: 'temple@gmail.com',
        password: 'password'
    },
    {
        username: 'Adrian24',
        email: 'adrian@gmail.com',
        password: 'password'
    },
    {
        username: 'Todd25',
        email: 'todd@gmail.com',
        password: 'password'
    },
    {
        username: 'Josie26',
        email: 'josie@gmail.com',
        password: 'password'
    }
];

// creates the data in the user table, the individualHooks will hash the password when the user is created
const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers