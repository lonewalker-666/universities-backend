import axios from "axios";
import loggers from "../config/logger.js";
import model from "../models/index.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PibWRRqRe4yrWR1soZdbmoYirTsm9QnkUs6o1UxLDXsI9E6ha9Myx1MkF3BMP2BOFX2cOUGNXVRq8xeoSOEPPN700GFJpfN1j"
);

const YOUR_DOMAIN = "http://localhost:3000";

const createCheckoutSession = async (req, res) => {
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

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: "price_1Pj4iDRqRe4yrWR1DZxv3DC7",
          quantity: 1,
        },
      ],
      mode: "subscription",
      return_url: `${YOUR_DOMAIN}/subscribe?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.json({
      success: true,
      message: "Checkout session created!",
      session_id: session.id,
    });
  } catch (error) {
    console.error("Error in createCheckoutSession:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkSessionStatus = async (req, res) => {
  try {
    const session_id = req?.query?.session_id;
    if(!session_id) {
      return res.status(400).json({
        success: false,
        message: "Session id not found.",
      });
    }
    const session = await stripe.checkout.sessions.retrieve(session_id);
    return res.json({
      success: true,
      message: "Checkout session status fetched!",
      session,
    });
  } catch (error) {
    console.error("Error in checkSessionStatus:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createCheckoutSession , checkSessionStatus};
