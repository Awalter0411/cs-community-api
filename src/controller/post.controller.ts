import { Request, Response } from "express";
import response from "../app/response.js";
import { Category } from "../entity/category.entity.js";
import { findCategoryByIdService } from "../service/category.service.js";
import { createPostService, deletePostService, findPostByCateService, findPostByIdService, findPostListService } from "../service/post.service.js";

export async function createPost(req: Request, res: Response) {
    const { title, description, content, category }: { title: string, description: string, content: string, category: number[] } = req.body
    const categories: Category[] = []
    for (let i = 0; i < category.length; i++) {
        const tmp = await findCategoryByIdService(category[i])
        if (tmp?.id) {
            categories.push(tmp)
        }
    }
    const result = await createPostService({ title, description, content, categories })
    res.json(response.Success(result))
}

export async function findPostList(req: Request, res: Response) {
    const pageNum = parseInt(req.query.pageNum as string)
    const pageSize = parseInt(req.query.pageSize as string)
    const result = await findPostListService(pageNum, pageSize)
    res.json(response.Success(result))
}

export async function findPostByCate(req: Request, res: Response) {
    const pageNum = parseInt(req.query.pageNum as string)
    const pageSize = parseInt(req.query.pageSize as string)
    const categoryId = parseInt(req.query.categoryId as string)
    const result = await findPostByCateService(pageNum, pageSize, categoryId)
    res.json(response.Success(result))
}

export async function findPostById(req: Request, res: Response) {
    const result = await findPostByIdService(parseInt(req.params.id))
    res.json(response.Success(result))
}

export async function deletePost(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const result = await deletePostService(id)
    res.json(response.Success(result))
}
