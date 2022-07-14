const jwtService = require('./jwtService');
// const { User } = require('../database/models/index');

const validateToken = async (token) => {
    if (!token) {
      const e = new Error('Token not found');
      e.name = 'UNAUTHORIZED';
      throw e;
    }
    const user = await jwtService.validateToken(token);
    
    return user;
  };

module.exports = { validateToken };
