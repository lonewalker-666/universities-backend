"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class FirstGeneration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FirstGeneration.init(
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
      created_at:{
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_by:{
        type: Sequelize.STRING,
        allowNull:false
      },
    },
    {
      sequelize,
      modelName: "FirstGeneration",
      tableName: "firstGeneration",
      timestamps: false
    }
  );
  return FirstGeneration;
}