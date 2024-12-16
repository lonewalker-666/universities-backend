"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Plan.init(
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
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      discountedPercentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      },
      price_id:{
        type: Sequelize.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "Plan",
      tableName: "plan",
      timestamps: false
    }
  );
  return Plan;
}