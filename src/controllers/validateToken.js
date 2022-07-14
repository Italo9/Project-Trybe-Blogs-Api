const validateTokenService = require('../services/validateTokenService');

const validateToken = async (req, _res, next) => {
    const { authorization } = req.headers;
    const user = await validateTokenService.validateToken(authorization);
    req.user = user;

    next();
};

module.exports = { validateToken };