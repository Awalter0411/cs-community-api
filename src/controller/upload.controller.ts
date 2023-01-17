import { Request, Response } from "express";
import response from "../app/response.js";

export async function uploadImage(req: Request, res: Response) {
   res.json(response.Success({ link: `${req.protocol}://${req.hostname}:5000/${req.file?.filename}` }, '上传成功'))
}

