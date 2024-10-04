"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      grade_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Grade",
          key: "id",
        },
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Gender",
          key: "id",
        },
      },
      race_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Race",
          key: "id",
        },
      },
      armed_force_status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Armed_Force_Status",
          key: "id",
        },
      },
      citizenship_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Citizenship",
          key: "id",
        },
      },
      first_generation: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      scholarship_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Scholarship",
          key: "id",
        },
      },
      high_school_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "HighSchool",
          key: "id",
        },
      },
      grade_level_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "GradeLevel",
          key: "id",
        },
      },
      college_start_date:{
        type: Sequelize.DATE,
        allowNull: true,
      },
      gpa:{
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      plan_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Plan",
          key: "id",
        },
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
      modelName: "User",
      tableName: "user",
      timestamps: false,
    }
  );
  return User;
};
