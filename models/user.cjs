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
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
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
      class_rank: {
        type: Sequelize.STRING,
        allowNull: true,
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
      first_generation_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "FirstGeneration",
          key: "id",
        },
      },
      financial_aid_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "FinancialAid",
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
      college_start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      graduation_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      gpa: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      about:{
        type: Sequelize.STRING,
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
      otp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      otp_expire_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password_lastUpdated: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      emailVerified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      mobileVerified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      about: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      houseHeld: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      physical_disability: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      additionalInfo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profileEmojiId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 1,
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
