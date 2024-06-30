/**
 * data     : id, name, email, password
 * flow     : model -> service -> controller -> routes
 * methods  :
 */
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

class User {
  constructor() {
    this.users = [
      {
        id: 'user-1',
        name: 'Rafi Syihab',
        email: 'rafi@example.com',
        password: bcrypt.hashSync('password123', 10),
      },
      {
        id: 'user-2',
        name: 'Asep Kopling',
        email: 'asep@example.com',
        password: bcrypt.hashSync('password123', 10),
      },
    ];
  }

  async register(data) {
    const { name, email, password } = data;

    const isExist = this.users.find((user) => user.email === email);
    if (isExist) {
      return null; // jika sudah ada akan null
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: nanoid(16),
      name,
      email,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return newUser;
  }

  async login(data) {
    const { email, password } = data;

    const userData = this.users.find((user) => user.email === email);
    if (!userData) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return null;
    }

    const token = generateToken(userData);
    return token;
  }

  getAll() {
    return this.users.map(({ password, ...user }) => user);
  }

  getUserById(id) {
    const userData = this.users.find((user) => user.id === id);
    if (userData) {
      const { password, ...filteredUserData } = userData;
      return filteredUserData;
    }
    return null;
  }
}

module.exports = new User();
