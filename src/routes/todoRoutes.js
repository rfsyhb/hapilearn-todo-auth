const todoController = require('../controllers/todoController');
const { verifyToken } = require('../utils/auth');

module.exports = [
  {
    method: 'GET',
    path: '/todos',
    handler: todoController.getTodos,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: 'GET',
    path: '/todos/{id}',
    handler: todoController.getTodoById,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: 'POST',
    path: '/todos',
    handler: todoController.createTodo,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: 'PUT',
    path: '/todos/{id}',
    handler: todoController.updateTodo,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: 'DELETE',
    path: '/todos/{id}',
    handler: todoController.deleteTodo,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
];
