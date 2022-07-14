const Joi = require('joi');
const { Category } = require('../database/models/index');

const validateBody = (data) => {
    const schema = Joi.object({
    name: Joi.string().required()
    .messages({
        'any.required': '"name" is required',
        'string.empty': '"name" is required',
         }),

  });

  const { name } = data;
  const { error, value } = schema.validate({ name });
  if (error) {
    const customError = { name: 'BAD_REQUEST', message: error.details[0].message };
    throw customError;
  } 
  return value;
};

const createCategory = async ({ name }) => {
    const category = await Category.create(
        { name },
    );
   return category;
};

module.exports = {
    createCategory,
    validateBody,
  };