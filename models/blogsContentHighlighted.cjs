"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class BlogsContentHighlighted extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BlogsContentHighlighted.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      paragraph_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "BlogsContentHighlighted",
            key: "id",
          },
      },
      highlighted_text:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      url:{
        type: Sequelize.STRING,
        allowNull: true,
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
      modelName: "BlogsContentHighlighted",
      tableName: "blogsContentHighlighted",
      timestamps: false,
    }
  );
  return BlogsContentHighlighted;
};
