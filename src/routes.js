const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

const routes = [...todoRoutes, ...userRoutes];

module.exports = routes;
