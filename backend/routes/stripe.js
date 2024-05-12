const express = require("express");
const { Order } = require("../models/order");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata: {
            id: item.id,
            quantity: item.cartQuantity,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({
    url: session.url,
  });
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;

    const endpointSecret = process.env.STRIPE_ENDPOINT;

    if (endpointSecret) {
      const signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
      }
    }

    if (event.type === "checkout.session.completed") {
      const data = event.data.object;

      //customer
      const customer = await stripe.customers.retrieve(data.customer);

      //items
      const line_items = await stripe.checkout.sessions.listLineItems(data.id, {
        expand: ["data.price.product"],
      });

      //Create a new object
      const items = line_items.data.map((item) => {
        return {
          id: item.price.product.metadata.id,
          name: item.price.product.name,
          brand: item.price.product.name,
          desc: item.price.product.description,
          price: item.price.unit_amount / 100,
          image: item.price.product?.images[0],
          cartQuantity: item.price.product.metadata.quantity,
        };
      });

      const newOrder = new Order({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products: items,
        subtotal: data.amount_subtotal / 100,
        total: data.amount_total / 100,
        shipping: data.customer_details,
        payment_status: data.payment_status,
        order_timestamp: data.created,
      });

      try {
        const savedOrder = await newOrder.save();

        console.log("Saved to DB:", savedOrder);
      } catch (error) {
        console.log(error.message);
      }
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
