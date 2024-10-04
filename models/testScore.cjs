"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class TestScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TestScore.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      test_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:"StandardizedTests",
            key: "id"
        }
      },
      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:"TestSubjects",
            key: "id"
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:"User",
            key: "id"
        }
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
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
      modelName: "TestScore",
      tableName: "testScore",
      timestamps: false
    }
  );
  return TestScore;
}