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
        primaryKey: true,
        autoIncrement: true,
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
      updated_at:{
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_by:{
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
      timestamps: false,
      indexes: [
        {
          unique: true, // Create a combined unique index
          fields: ["subject_id","user_id"], // Specify the columns
        },
      ],
    }
  );
  return TestScore;
}