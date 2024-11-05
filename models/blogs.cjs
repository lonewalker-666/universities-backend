"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Blogs.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      uuid: {
        type: Sequelize.UUID, // Use Sequelize.UUID data type
        defaultValue: Sequelize.UUIDV4, // Automatically generates a UUID
        allowNull: false,
        unique: true
      },
      blog_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "BlogCategory",
          key: "id"
        }
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      file_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      folder: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_by:{
        type: Sequelize.STRING,
        allowNull:false
      },
      deleted_at:{
        type: Sequelize.DATE,
        allowNull:true,
      },
      deleted_by:{
        type: Sequelize.STRING,
        allowNull:true
      }
    },
    {
      sequelize,
      modelName: "Blogs",
      tableName: "blogs",
      timestamps: false
    }
  );
  return Blogs;
}