import { Request, Response } from 'express'
import response from '../app/response.js'
import { createResourceService, deleteResourceService, findResourceListService } from '../service/resource.service.js'

export async function createResource(req: Request, res: Response) {
  const { name = '', link = '', cover = 'http://localhost:5000/xxx.jpg', content = '' } = req.body
  const result = await createResourceService({ name, link, cover, content })
  res.json(response.Success(result))
}

export async function findResourceList(req: Request, res: Response) {
  const result = await findResourceListService()
  res.json(response.Success({ list: result[0], count: result[1] }))
}

export async function deleteResource(req: Request, res: Response) {
  const { id } = req.params
  const result = await deleteResourceService(parseInt(id))
  res.json(response.Success(result, '删除成功'))
}
