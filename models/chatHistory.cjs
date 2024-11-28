"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class ChatHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatHistory.init(
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
        references: {
          model: "User",
          key: "id",
        }
      },
      chatId: {
        type: Sequelize.UUID, // Use Sequelize.UUID data type
        defaultValue: Sequelize.UUIDV4, // Automatically generates a UUID
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ChatHistory",
      tableName: "chatHistory",
      timestamps: false,
    }
  );
  return ChatHistory;
};
