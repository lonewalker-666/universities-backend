import axios from "axios";
import loggers from "../config/logger.js";
import config from "../config/config.js";
import model from "../models/index.js";

// const createChat = async (req, res) => {
//   try {
//     const user_id = req?.user?.id;
//     if (!user_id) {
//       return res.status(401).json({
//         success: false,
//         message: "Unautorized.",
//       });
//     }
//     const checkUser = await model.User.findOne({ where: { id: user_id } });
//     if (!checkUser) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found.",
//       });
//     }
//     if (checkUser?.plan_id === 1) {
//       return res.status(400).json({
//         success: false,
//         message: "You need to upgrade your plan to use this feature.",
//       });
//     }
//     const checkUnusedChats = await model.ChatHistory.findOne({
//       where: { user_id, title: null },
//     });
//     if (checkUnusedChats) {
//       return res.status(200).json({
//         success: true,
//         message: "Successfully created chat.",
//         chat_id: checkUnusedChats?.chat_id,
//       });
//     }
//     const chatBotResponse = await axios.post(config.chatUrl + "/start/", {
//       user_id,
//     });
//     console.log(chatBotResponse?.data,"vfdvf /n");
//     if (chatBotResponse?.data?.success) {
//       const createChat = await model.ChatHistory.create({
//         user_id,
//         title: null,
//       });
//       if (!createChat) {
//         return res.status(400).json({
//           success: false,
//           message: "Error creating chat.",
//         });
//       }
//       console.log("Chat created:", createChat);
//       return res.status(200).json({
//         success: true,
//         message: "Successfully created chat.",
//         chat_id: createChat,
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Chatbot is not responding.",
//       });
//     }
//   } catch (error) {
//     console.error("Error in createChat:", error);
//     loggers.error(error.message + " from createChat function");
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal Server Error",
//     });
//   }
// };

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
    const chatHistory = await model.ChatHistory.findOne({
      where: { user_id, chatId: chat_id, deleted_at: null },
      attributes: ["title", "chatId"],
      include: [
        {
          model: model.ChatResponse,
          attributes: ["id", "request", "response"],
          limit: 1,
          order: [["id", "DESC"]],
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

export const askBot = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    const { message, chatId } = req.body;
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

    return res.status(200).json({
      success: true,
      message: "Successfully fetched chat history.",
      chatBotResponse,
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

const createChat = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const checkUser = await model.User.findOne({ where: { id: user_id } });
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    if (checkUser?.plan_id === 1) {
      return res.status(400).json({
        success: false,
        message: "You need to upgrade your plan to use this feature.",
      });
    }

    const checkUnusedChats = await model.ChatHistory.findOne({
      where: { user_id, title: null, deleted_at: null },
    });

    if (checkUnusedChats) {
      return res.status(200).json({
        success: true,
        message: "Successfully created chat.",
        chat_id: checkUnusedChats?.id, // Return the existing chat ID
      });
    }

    console.log("Chatbot API Call Payload:", { user_id });
    const chatBotResponse = await axios.post(config.chatUrl + "/start/", {
      user_id,
    });
    console.log("Chatbot Response:", chatBotResponse?.data);

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

      console.log("Chat created successfully:", createChat);
      return res.status(200).json({
        success: true,
        message: "Successfully created chat.",
        chat_id: createChat?.chatId, // Return the ID of the new chat
      });
    } else {
      console.error("Chatbot error:", chatBotResponse?.data);
      return res.status(400).json({
        success: false,
        message: "Chatbot is not responding.",
      });
    }
  } catch (error) {
    console.error("Error in createChat:", error);
    loggers.error(`createChat function error: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export { createChat, getChatHistory, getChat };
