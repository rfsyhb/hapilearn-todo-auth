const jwt = require('jsonwebtoken');
const serverInstance = require('./serverInstance');
const secretKey = require('./secretKey');

const generateToken = (user) => {
  if (!user || !user.id) {
    throw new Error('Invalid user object');
  }

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    instanceId: serverInstance.id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 jam session
  };

  return jwt.sign(payload, secretKey.key, { algorithm: 'HS256' });
};

module.exports = generateToken;
