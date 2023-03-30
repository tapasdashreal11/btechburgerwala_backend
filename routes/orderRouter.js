import express from "express";
import { getMyOrders, getOrderById, placeOrder } from "../controllers/order.js";
import { isAuthenticated } from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.get("/get-orders", isAuthenticated, getMyOrders);
orderRouter.get("/get-order/:id", isAuthenticated, getOrderById);
orderRouter.post("/place-order", isAuthenticated, placeOrder);

export default orderRouter;
