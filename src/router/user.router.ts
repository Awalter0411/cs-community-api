import express from "express";
import { Request as JwtRequest } from "express-jwt";
import { body } from "express-validator";
import response from "../app/response.js";
import { loginController, registerController } from "../controller/user.controller.js";
import validate from "../middleware/validate.js";

const userRouter = express.Router();

userRouter.post(
  "/user/register",
  body("username").isString(),
  body("password").isString(),
  body("email").isEmail(),
  body("phone").isString(),
  validate,
  registerController
);

userRouter.post(
  "/user/login",
  body("username").isString(),
  body("password").isString(),
  validate,
  loginController
)

userRouter.get("/user", (req: JwtRequest, res) => {
  console.log(req.auth);
  res.json(response.Success(req.auth));
});

export default userRouter;
