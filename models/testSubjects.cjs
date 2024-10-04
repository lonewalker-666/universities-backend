"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class TestSubjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TestSubjects.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      test_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "StandardizedTests",
          key: "id",
        },
      },
      totalScore: {
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
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "TestSubjects",
      tableName: "testSubjects",
      timestamps: false,
      indexes: [
        {
          unique: true, // Create a combined unique index
          fields: ["name", "test_id"], // Specify the columns
        },
      ],
    }
  );
  return TestSubjects;
};
