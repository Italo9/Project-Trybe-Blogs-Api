const Joi = require('joi');
const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { BlogPost, Category, PostCategory } = require('../database/models/index');

const validateBody = (data) => {
    const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.required(),
  }).messages({
    'any.required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
});
  const { title, content, categoryIds } = data;
  const { error, value } = schema.validate({ title, content, categoryIds });
  if (error) {
    const customError = { name: 'BAD_REQUEST', message: error.details[0].message };
    throw customError;
  } 
  return value;
};

const auxiliaryCheck = async (categoryIds) => {
  const checks = await Promise.all(categoryIds
    .map((elementoId) => Category.findOne({ where: { id: elementoId } })));
    return checks;
};

const auxiliaryPost = async (title, content, userId, t) => {
  const newPost = await BlogPost.create( 
    { title, content, userId },
    );
    await t.commit();
    return newPost;
};

const addPostBlog = async ({ title, content, categoryIds }, reqUser) => {
    const t = await sequelize.transaction();
    const { id } = reqUser;
        const checkCategory = await auxiliaryCheck(categoryIds);
        const categoryWithoutError = checkCategory.map((ele) => {
          if (!ele) {
            const e = new Error('"categoryIds" not found');
            e.name = 'BAD_REQUEST';
            throw e;
          }
          return ele;
        });
       const createPost = await auxiliaryPost(title, content, id, t);
       Promise.all(categoryWithoutError.map(async (ele) => PostCategory.create({
            postId: createPost.id,
            categoryId: ele.dataValues.id,
          })));
        return createPost;
  };

  module.exports = {
    validateBody,
    addPostBlog,
  };