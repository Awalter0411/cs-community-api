import { AppDataSource } from "../app/database.js";
import { Category } from "../entity/category.entity.js";
import { CollectionPost } from "../entity/collectionPost.entity.js";
import { Post } from "../entity/post.entity.js";
import { StarPost } from "../entity/starPost.entity.js";
import { User } from "../entity/user.entity.js";
import { findCategoryByIdService } from "./category.service.js";

export async function createPostService(postData: Pick<Post, 'title' | 'description' | 'content' | 'categories' | 'cover'>, userId: number) {
    const PostRepo = await AppDataSource.getRepository(Post)
    const newPost = await PostRepo.create(postData)
    const UserRepo = await AppDataSource.getRepository(User)
    const user = await UserRepo.findOne({ where: { id: userId } })
    newPost.user = user!
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
    const result = await PostRepo.findOne({ where: { id, isDelete: false }, relations: { categories: true, user: true } })
    if (result) {
        await PostRepo.update({ id }, { views: ++result.views })
    }
    return result
}

export async function deletePostService(id: number) {
    const PostRepo = await AppDataSource.getRepository(Post)
    return await PostRepo.update({ id }, { isDelete: true })
}

export async function starPostService(postId: number, userId: number) {
    const StarPostRepo = await AppDataSource.getRepository(StarPost)
    const PostRepo = await AppDataSource.getRepository(Post)
    const post = await PostRepo.findOne({ where: { id: postId } }) as Post
    const result = await StarPostRepo.findOne({ where: { postId, userId } })
    if (result) {
        await StarPostRepo.update({ postId, userId }, { isDelete: !result.isDelete })
        if (!result.isDelete) {
            post.stars--
        } else {
            post.stars++
        }
        await PostRepo.update({ id: postId }, { stars: post.stars })
        return !result.isDelete ? '取消点赞' : '点赞成功'
    }
    const newStarPost = await StarPostRepo.create({ postId, userId })
    await StarPostRepo.save(newStarPost)
    await PostRepo.update({ id: postId }, { stars: 1 })
    return '点赞成功'
}

export async function collectionPostService(postId: number, userId: number) {
    const CollectionPostRepo = await AppDataSource.getRepository(CollectionPost)
    const PostRepo = await AppDataSource.getRepository(Post)
    const post = await PostRepo.findOne({ where: { id: postId } }) as Post
    const result = await CollectionPostRepo.findOne({ where: { postId, userId } })
    if (result) {
        await CollectionPostRepo.update({ postId, userId }, { isDelete: !result.isDelete })
        if (!result.isDelete) {
            post.collections--
        } else {
            post.collections++
        }
        await PostRepo.update({ id: postId }, { collections: post.collections })
        return !result.isDelete ? '取消收藏' : '收藏成功'
    }
    const newStarPost = await CollectionPostRepo.create({ postId, userId })
    await CollectionPostRepo.save(newStarPost)
    await PostRepo.update({ id: postId }, { collections: 1 })
    return '收藏成功'
}

export async function findStarPostService(userId: number) {
    const StarPostRepo = await AppDataSource.getRepository(StarPost)
    const PostRepo = await AppDataSource.getRepository(Post)
    const postIdsData = await StarPostRepo.find({ where: { userId } })
    const result: Post[] = []
    for (let i = 0; i < postIdsData.length; i++) {
        const tmp = await PostRepo.findOne({ where: { id: postIdsData[i].postId }, relations: { categories: true } })
        result.push(tmp!)
    }
    return result
}

export async function findCollectionPostService(userId: number) {
    const CollectionPostRepo = await AppDataSource.getRepository(CollectionPost)
    const PostRepo = await AppDataSource.getRepository(Post)
    const postIdsData = await CollectionPostRepo.find({ where: { userId } })
    const result: Post[] = []
    for (let i = 0; i < postIdsData.length; i++) {
        const tmp = await PostRepo.findOne({ where: { id: postIdsData[i].postId }, relations: { categories: true } })
        result.push(tmp!)
    }
    return result
}

export async function getPostListByCateService(id: number) {
    const CategoryRepo = await AppDataSource.getRepository(Category)
    const PostRepo = await AppDataSource.getRepository(Post)
    const category = await CategoryRepo.findOne({ where: { id } }) as Category
    const result = await (await PostRepo.findAndCount({ relations: ["categories", "user"], where: { isDelete: false } }))
    const postList = result[0].filter(post => {
        const cate = post.categories.filter(cate => cate.id === category.id)
        if (cate.length > 0) {
            return post
        }
    }
    )
    return [postList, postList.length]
}

export async function getPostListByUserService(userId: number) {
    const PostRepo = await AppDataSource.getRepository(Post)
    const result = await (await PostRepo.findAndCount({ relations: ["categories", "user"], where: { isDelete: false } }))
    const postList = result[0].filter(post => {
        return post.user.id === userId
    }
    )
    return [postList, postList.length]
}

export async function getStarPostListByUserService(userId: number) {
    const PostRepo = await AppDataSource.getRepository(Post)
    const UserRepo = await AppDataSource.getRepository(User)
    const StarPostRepo = await AppDataSource.getRepository(StarPost)
    const user = await UserRepo.findOne({ where: { id: userId } })
    const stars = await StarPostRepo.find({ where: { userId: user?.id } })
    const postList: Post[] = []
    for (let i = 0; i < stars.length; i++) {
        const item = stars[i]
        const post = await PostRepo.findOne({ where: { id: item.postId, isDelete: false }, relations: { categories: true, user: true } }) as Post
        postList.push(post)
    }
    return [postList, postList.length]
}

export async function getCollectPostListByUserService(userId: number) {
    const PostRepo = await AppDataSource.getRepository(Post)
    const UserRepo = await AppDataSource.getRepository(User)
    const CollectionPostRepo = await AppDataSource.getRepository(CollectionPost)
    const user = await UserRepo.findOne({ where: { id: userId } })
    const collections = await CollectionPostRepo.find({ where: { userId: user?.id } })
    const postList: Post[] = []
    for (let i = 0; i < collections.length; i++) {
        const item = collections[i]
        const post = await PostRepo.findOne({ where: { id: item.postId, isDelete: false }, relations: { categories: true, user: true } }) as Post
        postList.push(post)
    }
    return [postList, postList.length]
}
