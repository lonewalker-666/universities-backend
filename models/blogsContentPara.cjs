"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class BlogsContentPara extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BlogsContentPara.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      blog_topic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "BlogsTopic",
          key: "id",
        },
      },
      paragraph: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      para_order:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_by: {
        type: Sequelize.STRING,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: "BlogsContentPara",
      tableName: "blogsContentPara",
      timestamps: false,
    }
  );
  return BlogsContentPara;
};
