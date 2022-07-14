const Joi = require('joi');
const { User } = require('../database/models/index');
const jwtService = require('./jwtService');

const validateBody = (data) => {
    const schema = Joi.object({
    displayName: Joi.string().min(8)
    .messages({ 'string.min': '"displayName" length must be at least 8 characters long' }),
    email: Joi.string().email()
    .messages({ 'string.empty': 'email must be a valid email' }),
    password: Joi.string().min(6)
    .messages({ 'string.min': '"password" length must be at least 6 characters long' }),
  });

  const { displayName, email, password } = data;
  const { error, value } = schema.validate({ displayName, email, password });
  console.log(error);
  if (error) {
    const teste = { name: 'BAD_REQUEST', message: error.details[0].message };
    throw teste;
  } 
  return value;
};

const createUser = async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const e = new Error('User already registered');
      e.name = 'CONFLICT';
      throw e;
    }
    await User.create(
        { displayName, email, password, image },
    );
    const token = jwtService.createToken({ data: email });

    return { token };
};

module.exports = {
    createUser,
    validateBody,
  };