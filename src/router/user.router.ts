import express from "express";
import { body, param, query } from "express-validator";
import { findAllUserList, findUserById, findUserInfo, login, register, updateUser } from "../controller/user.controller.js";
import validate from "../middleware/validate.js";

const userRouter = express.Router();

userRouter.post(
  "/user/register",
  body("username").isString(),
  body("password").isString(),
  body("email").isEmail(),
  body("phone").isMobilePhone('zh-CN'),
  validate,
  register
);

userRouter.post(
  "/user/login",
  body("username").isString(),
  body("password").isString(),
  validate,
  login
)

userRouter.get('/user', findUserInfo)

userRouter.get("/user/list",
  query('pageNum').isInt(),
  query('pageSize').isInt(),
  validate,
  findAllUserList
);

userRouter.put('/user',
  body("username").isString(),
  validate,
  updateUser
)

userRouter.get('/user/:id',
  param('id').isInt(),
  validate,
  findUserById
)

export default userRouter;
