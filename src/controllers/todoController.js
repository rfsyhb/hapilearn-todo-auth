const todoService = require('../services/todoService');

exports.getTodos = (request, h) => {
  const ownerId = request.auth.credentials.id;
  const todos = todoService.getTodos();
  const userTodos = todos.filter((todo) => todo.ownerId === ownerId);
  return h.response({ data: { userTodos } }).code(200).type('application/json');
};

exports.getTodoById = (request, h) => {
  const todo = todoService.getTodosById(request.params.id);
  if (todo) {
    return h.response({ data: { todo } }).code(200).type('application/json');
  }
  return h
    .response({ message: 'Todo not found' })
    .code(404)
    .type('application/json');
};

exports.createTodo = (request, h) => {
  const ownerId = request.auth.credentials.id;
  const data = { ...request.payload, ownerId };
  const newTodo = todoService.createTodo(data);
  return h.response({ data: { newTodo } }).code(201).type('application/json');
};

exports.updateTodo = (request, h) => {
  const updatedTodo = todoService.updateTodo(
    request.params.id,
    request.payload,
  );
  if (updatedTodo) {
    return h
      .response({ data: { updatedTodo } })
      .code(200)
      .type('application/json');
  }
  return h
    .response({ message: 'Todo not found' })
    .code(404)
    .type('application/json');
};

exports.deleteTodo = (request, h) => {
  const result = todoService.deleteTodo(request.params.id);
  if (result) {
    return h
      .response({ message: 'Todo deleted', data: { result } })
      .code(200)
      .type('application/json');
  }
  return h
    .response({ message: 'Todo not found' })
    .code(404)
    .type('application/json');
};
