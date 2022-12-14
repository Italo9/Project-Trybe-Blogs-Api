'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
     type: DataTypes.INTEGER,
     defaultValue: DataTypes.INTEGER,
    },
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
  }, {
    tableName: 'BlogPosts',
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {as: 'user', foreignKey: 'userId'})
  }

  return BlogPost
};