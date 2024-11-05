"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Essay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Essay.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      essayId:{
        type: Sequelize.UUID, // Use Sequelize.UUID data type
        defaultValue: Sequelize.UUIDV4, // Automatically generates a UUID
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at:{
        type: Sequelize.DATE,
        allowNull:true,
      }
    },
    {
      sequelize,
      modelName: "Essay",
      tableName: "essay",
      timestamps: false
    }
  );
  return Essay;
}