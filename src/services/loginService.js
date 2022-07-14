const Joi = require('joi');
const { User } = require('../database/models/index');
const jwtService = require('./jwtService');

const validateBody = (data) => {
    const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).messages({
    'any.required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
});
  const { email, password } = data;
  const { error, value } = schema.validate({ email, password });
  if (error) {
    const teste = { name: 'BAD_REQUEST', message: error.details[0].message };
    throw teste;
  } 
  return value;
};

const validateCredentials = async ({ email, password }) => {
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      const e = new Error('Invalid fields');
      e.name = 'BAD_REQUEST';
      throw e;
    }

    const token = jwtService.createToken({ data: email });

    return { token };
};

const login = async ({ email, password }) => {
    validateBody({ email, password });
    const result = await User.create(
        { email, password },
    );
    return result;
  };

  module.exports = {
    login,
    validateCredentials,
    validateBody,
  };