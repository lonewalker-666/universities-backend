import model from "../models/index.js";
import Stripe from "stripe";
import config from "../config/config.js";
import { Op } from "sequelize";

const stripeSecretKey = config.stripe_secret_key;

const stripe = new Stripe(stripeSecretKey);

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
    const price_id = req?.body?.price_id;
    const checkPlan = await model.Plan.findOne({
      where: { price_id, active: 1, deleted_at: null, id: { [Op.ne]: 1 } },
    });
    if (!checkPlan) {
      return res.status(400).json({
        success: false,
        message: "Plan Missing",
      });
    }
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      return_url: `${YOUR_DOMAIN}/paymentResponse?session_id={CHECKOUT_SESSION_ID}&price_id=${price_id}`,
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
    const price_id = req?.query?.price_id;
    if (!session_id) {
      return res.status(400).json({
        success: false,
        message: "Session id not found.",
      });
    }
    if (!price_id) {
      return res.status(400).json({
        success: false,
        message: "Price id not found.",
      });
    }
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const payment_status = session.payment_status;
    if (payment_status === "paid") {
      const user_id = req?.user?.id;
      const checkUser = await model.User.findOne({ where: { id: user_id } });
      if (!checkUser) {
        return res.status(401).json({
          success: false,
          message: "User not found.",
        });
      }
      const checkPlan = await model.Plan.findOne({
        where: {
          price_id: price_id,
          active: 1,
          deleted_at: null,
          id: { [Op.ne]: 1 },
        },
      });
      if (!checkPlan) {
        return res.status(400).json({
          success: false,
          message: "Plan Missing",
        });
      }
      await model.User.update(
        { plan_id: checkPlan?.id },
        { where: { id: user_id } }
      );
      return res.json({
        success: true,
        message: "Successfully Subscribed.",
        session,
      });
    }
  } catch (error) {
    console.error("Error in checkSessionStatus:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createCheckoutSession, checkSessionStatus };
