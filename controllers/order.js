import { asyncError } from "../middlewares/errorMiddleware.js";
import Order from "../models/Order.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const placeOrder = asyncError(async (req, res, next) => {
  const { shippingInfo, orderItems, payment, price, tax, shipping, totalAmt } =
    req.body;

  const { _id: user } = req.user;

  const orderOptions = {
    shippingInfo,
    orderItems,
    payment,
    price,
    tax,
    shipping,
    totalAmt,
    user,
  };

  const order = await Order.create(orderOptions);

  res.status(201).json({
    success: true,
    message: "Order placed successfully!",
    order,
  });
});

export const getMyOrders = asyncError(async (req, res, next) => {
  const { _id: user } = req.user;
  const orders = await Order.find({ user }).populate("user");
  res.status(200).json({
    success: true,
    data: orders,
  });
});

export const getOrderById = asyncError(async (req, res, next) => {
  console.log("calles");
  const { id } = req.params;
  const order = await Order.findById(id).populate("user");

  if (!order) return next(new ErrorHandler("Invalid Id", 404));

  res.status(201).json({
    success: true,
    data: order,
  });
});

export const processOrder = asyncError(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return next(new ErrorHandler("Invalid Id", 404));

  switch (order.orderStatus) {
    case "Packaging":
      await order.updateOne({ orderStatus: "Shipped" });
      break;
    case "Shipped":
      await order.updateOne({
        orderStatus: "Delivered",
        deliveredAt: new Date(),
      });
      break;
    case "Delivered":
      return next(new ErrorHandler("Food already delivered!", 400));
      break;
    default:
      break;
  }

  res.status(200).json({
    success: true,
    message: "Order processed sucesfully",
  });
});
