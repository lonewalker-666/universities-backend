"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Grade.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
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
      modelName: "Grade",
      tableName: "grade",
      timestamps: false
    }
  );
  return Grade;
}