"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wishlist.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      college_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      college_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city_state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Wishlist",
      tableName: "wishlist",
      timestamps: false,
      indexes: [
        {
          unique: true, // Create a combined unique index
          fields: ["user_id", "college_id"], // Specify the columns
        },
      ],
    }
  );
  return Wishlist;
};
