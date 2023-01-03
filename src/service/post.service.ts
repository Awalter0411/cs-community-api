import { AppDataSource } from "../app/database.js";
import { Category } from "../entity/category.entity.js";
import { Post } from "../entity/post.entity.js";
import { findCategoryByIdService } from "./category.service.js";

export async function createPostService(postData: Pick<Post, 'title' | 'description' | 'content' | 'categories'>) {
    const PostRepo = await AppDataSource.getRepository(Post)
    const newPost = await PostRepo.create(postData)
    return await PostRepo.manager.save(newPost)
}

export async function findPostListService(pageNum: number, pageSize: number) {
    const PostRepo = await AppDataSource.getRepository(Post)
    return await PostRepo.find({
        take: pageSize, skip: (pageNum - 1) * pageSize, where: { isDelete: false }, relations: {
            categories: true
        }
    })
}

export async function findPostByCateService(pageNum: number, pageSize: number, categoryId: number) {
    const PostRepo = await AppDataSource.getRepository(Post)
    const cate = await findCategoryByIdService(categoryId) as Category
    return await PostRepo.find({
        take: pageSize, skip: (pageNum - 1) * pageSize, where: { isDelete: false, categories: [cate] }, relations: {
            categories: true
        }
    })
}

export async function findPostByIdService(id: number) {
    const PostRepo = await AppDataSource.getRepository(Post)
    return await PostRepo.findOne({ where: { id, isDelete: false }, relations: { categories: true } })
}

export async function deletePostService(id: number) {
    const PostRepo = await AppDataSource.getRepository(Post)
    return await PostRepo.update({ id }, { isDelete: true })
}
