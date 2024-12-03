import model from "../models/index.js";
import Stripe from "stripe";
import config from "../config/config.js";

const stripeSecretKey = config.stripe_secret_key;

const stripe = new Stripe(
  stripeSecretKey
);

const YOUR_DOMAIN = config.frontend_url;

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
    const price_id = req?.body?.price_id
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      return_url: `${YOUR_DOMAIN}/paymentResponse?session_id={CHECKOUT_SESSION_ID}`,
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
