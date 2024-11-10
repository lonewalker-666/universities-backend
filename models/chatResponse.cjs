"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class ChatResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatResponse.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      chat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      request: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      response:{
        type: Sequelize.JSON,
        allowNull: false,
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
      modelName: "ChatResponse",
      tableName: "chatResponse",
      timestamps: false,
    }
  );
  return ChatResponse;
};
