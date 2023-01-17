import express from "express";
import { body, param } from "express-validator";
import { deleteUser, createUser, findAllUserList, findUserById, findUserInfo, login, register, updateUser } from "../controller/user.controller.js";
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
  "/user",
  body("username").isString(),
  body("password").isString(),
  body("email").isEmail(),
  body("phone").isMobilePhone('zh-CN'),
  body("role").isString(),
  validate,
  createUser
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
  validate,
  findAllUserList
);

userRouter.put('/user',
  updateUser
)

userRouter.get('/user/:id',
  param('id').isInt(),
  validate,
  findUserById
)

userRouter.delete('/user/:id',
  param('id').isInt(),
  validate,
  deleteUser
)

export default userRouter;
