import express from "express";
import { uploadImage } from "../controller/upload.controller.js";
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/'); // 他会放在当前目录下的 /upload 文件夹下（没有该文件夹，就新建一个）
    },
    filename: function (req, file, cb) { // 在这里设定文件名
        cb(null, Date.now() + '-' + file.originalname) // 加上Date.now()可以避免命名重复
    }
})

const upload = multer({ storage })
const uploadRouter = express.Router();

uploadRouter.post(
    "/upload/image",
    upload.single('image'),
    uploadImage
);

export default uploadRouter
