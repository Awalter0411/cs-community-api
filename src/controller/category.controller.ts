import { Request, Response } from 'express'
import response from '../app/response.js'
import { createCategoryService, deleteCategoryService, findCategoryListService } from '../service/category.service.js'

export async function createCategory(req: Request, res: Response) {
    const { name = '' } = req.body
    const result = await createCategoryService(name)
    res.json(response.Success(result))
}

export async function findCategoryList(req: Request, res: Response) {
    const pageNum = parseInt(req.query.pageNum as string)
    const pageSize = parseInt(req.query.pageSize as string)
    const result = await findCategoryListService(pageNum, pageSize)
    res.json(response.Success(result))
}

export async function deleteCategory(req: Request, res: Response) {
    const { id } = req.params
    const result = await deleteCategoryService(parseInt(id))
    res.json(response.Success(result))
}

