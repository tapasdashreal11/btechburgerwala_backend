import express from "express";
import passport from "passport";
import { logout, myProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

userRouter.get("/login", passport.authenticate("google"), (req, res, next) =>
  res.send("Logged In")
);
// passport.authenticate("google", {
//     successRedirect: process.env.FRONTEND_URL,
//   })

userRouter.get("/me", isAuthenticated, myProfile);

userRouter.get("/logout", logout);

export default userRouter;
