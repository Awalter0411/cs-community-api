import { Request, Response } from "express";

export async function uploadImage(req: Request, res: Response) {
   console.log(req.file)
   res.json({msg:'success'})
}

