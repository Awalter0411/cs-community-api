import e, { Request, Response } from 'express'
import response from '../app/response.js'
import { createCategoryService, deleteCategoryService, findCategoryListService, getCategoryByIdService, updateCategoryService } from '../service/category.service.js'

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

export async function updateCategory(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const { name }: { name: string } = req.body
    const result = await updateCategoryService(id, name)
    res.json(response.Success(result, '更新成功'))
}

export async function getCategoryById(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const result = await getCategoryByIdService(id)
    res.json(response.Success(result))
}
