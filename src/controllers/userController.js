const userService = require('../services/userService');

/**
 * registerUser, loginUser, getUsers, getUsersById
 */
exports.registerUser = async (request, h) => {
  const newUser = await userService.registerUser(request.payload);
  if (newUser) {
    return h.response({ data: { newUser } }).code(200).type('application/json');
  }
  return h.response({ message: 'error' }).code(404).type('application/json');
};

exports.loginUser = async (request, h) => {
  const token = await userService.loginUser(request.payload);
  if (token) {
    return h.response({ data: { token } }).code(200).type('application/json');
  }
  return h.response({ message: 'error' }).code(404).type('application/json');
};

exports.getUsers = (request, h) => {
  const users = userService.getUsers();
  return h.response({ data: { users } }).code(200).type('application/json');
};

exports.getUsersById = (request, h) => {
  const user = userService.getUsersById(request.params.id);
  if (user) {
    return h.response({ data: { user } }).code(200).type('application/json');
  }
  return h
    .response({ message: 'User not found' })
    .code(404)
    .type('application/json');
};
