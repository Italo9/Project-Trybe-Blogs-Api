require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
      expiresIn: '5h',
      algorithm: 'HS256',
    });

    return token;
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    const e = new Error('Expired or invalid token');
    e.name = 'UNAUTHORIZED';
    throw e;
  }
};

module.exports = { createToken, validateToken };