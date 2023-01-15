import { Request, Response } from "express";
import { Request as JwtRequest } from "express-jwt";
import response from "../app/response.js";
import { Category } from "../entity/category.entity.js";
import { findCategoryByIdService } from "../service/category.service.js";
import { getPostListByCateService, createPostService, deletePostService, findPostByCateService, findPostByIdService, findPostListService, findStarPostService, starPostService, findCollectionPostService, collectionPostService } from "../service/post.service.js";

export async function createPost(req: JwtRequest, res: Response) {
    const id = req.auth?.id
    console.log(id)
    let { title, description, content, category, cover }: { title: string, description: string, content: string, category: number[], cover: string } = req.body
    if (!cover) {
        cover = 'http://localhost:5000/xxx.jpg'
    }
    const categories: Category[] = []
    for (let i = 0; i < category.length; i++) {
        const tmp = await findCategoryByIdService(category[i])
        if (tmp?.id) {
            categories.push(tmp)
        }
    }
    const result = await createPostService({ title, description, content, categories, cover }, id)
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

export async function findStarPost(req: JwtRequest, res: Response) {
    const userId = req.auth?.id as number
    const result = await findStarPostService(userId)
    res.json(response.Success(result))
}

export async function findCollectionPost(req: JwtRequest, res: Response) {
    const userId = req.auth?.id as number
    const result = await findCollectionPostService(userId)
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

export async function starPost(req: JwtRequest, res: Response) {
    const userId = req.auth?.id as number
    const postId = parseInt(req.params.id)
    const msg = await starPostService(postId, userId)
    res.json(response.Success(null, msg))
}

export async function collectionPost(req: JwtRequest, res: Response) {
    const userId = req.auth?.id as number
    const postId = parseInt(req.params.id)
    const msg = await collectionPostService(postId, userId)
    res.json(response.Success(null, msg))
}

export async function getPostListByCate(req: JwtRequest, res: Response) {
    const categoryId = parseInt(req.query.cateId as string)
    const result = await getPostListByCateService(categoryId)
    res.json(response.Success({ list: result[0], count: result[1] }))
}
