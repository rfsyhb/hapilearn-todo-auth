/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const serverInstance = require('./serverInstance');
const secretKey = require('./secretKey');

// Middleware verif token JWT
const verifyToken = (request, h) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return h
      .response({ message: 'Authorization header is missing' })
      .code(401)
      .takeover();
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey.key);

    /**
     * Pengujian apakah token masih dapat digunakan dari generateToken
     */
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > decoded.exp) {
      return h.response({ message: 'Token has expired' }).code(401).takeover();
    }

    if (decoded.instanceId !== serverInstance.id) {
      return h
        .response({ message: 'Token is no longer valid' })
        .code(401)
        .takeover();
    }

    // Menyimpan data decoded ke request.auth.credentials
    request.auth = { credentials: decoded };

    // melanjutkan ke header berikutnya
    return h.continue;
  } catch (err) {
    return h.response({ message: 'Invalid Token' }).code(401).takeover();
  }
};

module.exports = { verifyToken };
