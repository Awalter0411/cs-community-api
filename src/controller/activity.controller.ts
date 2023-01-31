import { Request as JwtRequest } from "express-jwt";
import { Response } from 'express'
import { createActivityService, findActivityListService, deleteActivityService, updateActivityService, getActivityByIdService, getActivityByDateService } from "../service/activity.service.js";
import response from "../app/response.js";

export async function createActivity(req: JwtRequest, res: Response) {
  const {
    name,
    description,
    content,
    link,
    date,
    cover
  }: Record<string, string> = req.body
  const activity = { name, description, content, link, date, cover }
  const result = await createActivityService(activity)
  res.json(response.Success(result, '创建成功'))
}

export async function findActivityList(req: JwtRequest, res: Response) {
  const result = await findActivityListService()
  res.json(response.Success({ list: result[0], count: result[1] }))
}

export async function deleteActivity(req: JwtRequest, res: Response) {
  const id = parseInt(req.params.id)
  const result = await deleteActivityService(id)
  res.json(response.Success(result, '删除成功'))
}

export async function updateActivity(req: JwtRequest, res: Response) {
  const id = parseInt(req.params.id)
  const {
    name,
    description,
    content,
    link,
    date,
    cover
  }: Record<string, string> = req.body
  const activity = {
    name,
    description,
    content,
    link,
    date,
    cover
  }
  const result = await updateActivityService(id, activity)
  res.json(response.Success(result, '更新成功'))
}

export async function getActivityById(req: JwtRequest, res: Response) {
  const id = parseInt(req.params.id)
  const result = await getActivityByIdService(id)
  res.json(response.Success(result))
}

export async function getActivityByDate(req: JwtRequest, res: Response) {
  const date = req.query.date as string
  const result = await getActivityByDateService(date)
  res.json(response.Success({ list: result, count: result.length }))
}
