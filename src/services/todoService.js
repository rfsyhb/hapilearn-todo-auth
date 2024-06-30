const Todo = require('../models/todoModel');

/**
 * getAll, getById, craete, update, delete
 */

exports.getTodos = () => Todo.getAll();
exports.getTodosById = (id) => Todo.getById(id);
exports.createTodo = (data) => Todo.create(data);
exports.updateTodo = (id, data) => Todo.update(id, data);
exports.deleteTodo = (id) => Todo.delete(id);
