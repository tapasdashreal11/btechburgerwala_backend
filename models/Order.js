import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    shippingInfo: {
      hNo: String,
      city: String,
      state: String,
      country: String,
      pinCode: String,
      contact: String,
    },

    orderItems: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    payment: {
      method: {
        type: String,
        enum: ["Online", "COD"],
        default: "COD",
      },
      info: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
      },
      paidAt: Date,
    },

    price: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    totalAmt: {
      type: Number,
      default: 0,
    },

    orderStatus: {
      type: String,
      enum: ["Packaging", "Shipped", "Delivered"],
      default: ["Preparing"],
    },

    // deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
