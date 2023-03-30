import express, { urlencoded } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import orderRouter from "./routes/orderRouter.js";
const app = express();
export default app;

dotenv.config({ path: "./config/config.env" });
connectPassport();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

app.use(errorMiddleware);
