import { AppDataSource } from "../app/database.js";
import { Category } from "../entity/category.entity.js";

export async function createCategoryService(name: string) {
    const CategoryRepo = await AppDataSource.getRepository(Category)
    const category = await CategoryRepo.create({ name })
    return await CategoryRepo.save(category)
}

export async function findCategoryListService(pageNum: number, pageSize: number) {
    const CategoryRepo = await AppDataSource.getRepository(Category)
    return await CategoryRepo.find({ take: pageSize, skip: (pageNum - 1) * pageSize, where: { isDelete: false } })
}
