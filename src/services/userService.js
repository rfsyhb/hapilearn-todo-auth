const User = require('../models/userModel');

/**
 * register, login, getAll, getUserById
 */

exports.registerUser = (data) => User.register(data);
exports.loginUser = (data) => User.login(data);
exports.getUsers = () => User.getAll();
exports.getUsersById = (id) => User.getUserById(id);
