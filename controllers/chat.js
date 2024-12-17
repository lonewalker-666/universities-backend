import axios from "axios";
import loggers from "../config/logger.js";
import config from "../config/config.js";
import model from "../models/index.js";
import generateTitle from "../middleware/titleGenerator.js";

const createChat = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Unautorized.",
      });
    }
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }
    const currentTime = new Date(); // Get the current time
    const trialEndTime = new Date(checkUser?.trial_ends_at); // Parse the trial end date

    if (checkUser?.plan_id == 1 && trialEndTime < currentTime) {
      return res.status(402).json({
        success: false,
        message: "Your trial period has ended. Please upgrade your plan.",
      });
    }
    const checkUnusedChats = await model.ChatHistory.findOne({
      where: { user_id, title: null },
    });
    if (checkUnusedChats) {
      return res.status(200).json({
        success: true,
        message: "Successfully created chat.",
        chat_id: checkUnusedChats?.chatId,
      });
    }
    const chatBotResponse = await axios.post(config.chatUrl + "/start/", {
      user_id,
    });
    console.log(chatBotResponse?.data, "vfdvf /n");
    if (chatBotResponse?.data?.success) {
      const createChat = await model.ChatHistory.create({
        user_id,
        title: null,
      });
      if (!createChat) {
        return res.status(400).json({
          success: false,
          message: "Error creating chat.",
        });
      }
      console.log("Chat created:", createChat);
      return res.status(200).json({
        success: true,
        message: "Successfully created chat.",
        chat_id: createChat?.chatId,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Chatbot is not responding.",
      });
    }
  } catch (error) {
    console.error("Error in createChat:", error);
    loggers.error(error.message + " from createChat function");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Unautorized.",
      });
    }
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }
    const chatHistory = await model.ChatHistory.findAll({
      where: { user_id, deleted_at: null },
      include: [
        {
          model: model.ChatResponse,
          attributes: ["id", "request", "response"],
          limit: 1,
          order: [["id", "DESC"]],
          where: { deleted_at: null },
        },
      ],
      order: [["id", "DESC"]],
    });
    return res.status(200).json({
      success: true,
      message: "Successfully fetched chat history.",
      chatHistory,
    });
  } catch (error) {
    console.error("Error in getChatHistory:", error);
    loggers.error(error.message + " from getChatHistory function");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getLastChat = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Unautorized.",
      });
    }
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }
    const chatHistory = await model.ChatHistory.findAll({
      where: { user_id, deleted_at: null },
      include: [
        {
          model: model.ChatResponse,
          attributes: ["id", "request", "response"],
          order: [["id", "DESC"]],
          where: { deleted_at: null },
        },
      ],
      limit: 1,
      order: [["id", "DESC"]],
    });
    return res.status(200).json({
      success: true,
      message: "Successfully fetched chat history.",
      chatHistory,
    });
  } catch (error) {
    console.error("Error in getLastChat:", error);
    loggers.error(error.message + " from getLastChat function");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getChat = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    const chat_id = req?.params?.chat_id;

    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Unautorized.",
      });
    }
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }
    const currentTime = new Date(); // Get the current time
    const trialEndTime = new Date(checkUser?.trial_ends_at); // Parse the trial end date

    if (checkUser?.plan_id == 1 && trialEndTime < currentTime) {
      return res.status(402).json({
        success: false,
        message: "Your trial period has ended. Please upgrade your plan.",
      });
    }
    
    const chatHistory = await model.ChatHistory.findOne({
      where: { user_id, chatId: chat_id, deleted_at: null },
      attributes: ["title", "chatId"],
      include: [
        {
          model: model.ChatResponse,
          attributes: ["id", "request", "response"],
          order: [["id", "ASC"]],
          where: { deleted_at: null },
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: "Successfully fetched chat history.",
      chatHistory,
    });
  } catch (error) {
    console.error("Error in getChat:", error);
    loggers.error(error.message + " from getChat function");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const askBot = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    const { message, chatId } = req.body;
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Unautorized.",
      });
    }
    if (!chatId) {
      return res.status(401).json({
        success: false,
        message: "Cannot find chat.",
      });
    }
    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }
    const chatHistory = await model.ChatHistory.findOne({
      where: { user_id, chatId: chatId, deleted_at: null },
    })
    if  (!chatHistory) {
      return res.status(400).json({
        success: false,
        message: "Chat not found.",
      });
    }
    
    const currentTime = new Date(); // Get the current time
    const trialEndTime = new Date(checkUser?.trial_ends_at); // Parse the trial end date
    if(!chatHistory?.title) {
      const generated = await generateTitle(message)
      await model.ChatHistory.update({ title: generated }, { where: { id: chatHistory?.id } })
    }

    if (checkUser?.plan_id == 1 && trialEndTime < currentTime) {
      return res.status(402).json({
        success: false,
        message: "Your trial period has ended. Please upgrade your plan.",
      });
    }

    const chat = await model.ChatHistory.findOne({
      user_id,
      chatId: chatId,
      deleted_at: null,
    });

    if (!chat?.id) {
      return res.status(400).json({
        success: false,
        message: "Chat not found.",
      });
    }

    const chatBotResponse = await axios.post(config.chatUrl + "/chatbot/", {
      user_id,
      message,
    });

    if (chatBotResponse.status !== 200) {
      return res.status(400).json({
        success: false,
        message: "Chatbot is not responding.",
      });
    }
    const chatData = chatBotResponse?.data;
    await model.ChatResponse.create({
      chat_id: chat?.id,
      request: req?.body,
      response: chatData,
    });
    return res.status(200).json({
      success: true,
      message: "Success",
      data: {
        id: chat?.id,
        request: req?.body,
        response: chatData,
      },
    });
  } catch (error) {
    console.error("Error in askBot:", error);
    loggers.error(error.message + " from askBot function");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const generateEssay = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    const { message } = req.body;
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Unautorized.",
      });
    }

    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    const chatBotResponse = await axios.post(config.chatUrl + "/essay/", {
      user_id,
      message,
    });
    console.log(chatBotResponse, "chatBotResponse");
    if (chatBotResponse.status !== 200) {
      return res.status(400).json({
        success: false,
        message: "Chatbot is not responding.",
      });
    }
    const chatData = chatBotResponse?.data;

    return res.status(200).json({
      success: true,
      message: "Successfully generated essay.",
      data: chatData,
    });
  } catch (error) {
    console.error("Error in generateEssay:", error);
    loggers.error(error.message + " from generateEssay function");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export {
  createChat,
  getChatHistory,
  getChat,
  askBot,
  generateEssay,
  getLastChat,
};
