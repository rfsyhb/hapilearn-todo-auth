/**
 * data     : id, ownerId, title, completed
 * flow     : model -> service -> controller -> routes
 * methods  : getAll, getById, create, update, delete
 */

/* eslint-disable */
const { nanoid } = require('nanoid');

class Todo {
  constructor() {
    this.todos = [
      { id: 1, ownerId: 'user-2', title: 'Learn Hapi.js', completed: false },
      { id: 2, ownerId: 'user-2', title: 'Built Hapi Todo', completed: false },
      { id: 3, ownerId: 'user-1', title: 'Berkebun', completed: false },
    ];
  }

  /* methods */
  getAll() {
    return this.todos;
  }

  getById(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  create(data) {
    const newTodo = {
      id: nanoid(16),
      ownerId: data.ownerId,
      title: data.title,
      completed: data.completed || false,
    };
    this.todos.push(newTodo);
    return newTodo; // display newData
  }

  update(id, data) {
    const todo = this.getById(id); // memilih todo
    if (todo) {
      todo.title = data.title !== undefined ? data.title : todo.title;
      todo.completed =
        data.completed !== undefined ? data.completed : todo.completed;
      return todo; // display hasil update
    }
    return null;
  }

  delete(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      return this.todos.splice(index, 1)[0]; // splice return array, nah [0] untuk aksesnya
    }
    return null;
  }
}

module.exports = new Todo();
