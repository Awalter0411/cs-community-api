import { AppDataSource } from "../app/database.js";
import { Category } from "../entity/category.entity.js";

export async function createCategoryService(name: string) {
    const CategoryRepo = await AppDataSource.getRepository(Category)
    const result = await CategoryRepo.findOne({ where: { name } })
    if (result?.isDelete) {
        return await CategoryRepo.update({ id: result.id }, { isDelete: false })
    }
    const category = await CategoryRepo.create({ name })
    return await CategoryRepo.save(category)
}

export async function findCategoryListService(pageNum: number, pageSize: number) {
    const CategoryRepo = await AppDataSource.getRepository(Category)
    return await CategoryRepo.find({ take: pageSize, skip: (pageNum - 1) * pageSize, where: { isDelete: false } })
}

export async function findCategoryByIdService(id: number) {
    const CategoryRepo = await AppDataSource.getRepository(Category)
    return await CategoryRepo.findOne({ where: { id, isDelete: false } })
}

export async function deleteCategoryService(id: number) {
    const CategoryRepo = await AppDataSource.getRepository(Category)
    return await CategoryRepo.update({ id }, { isDelete: true })
}

export async function updateCategoryService(id: number, name: string) {
    const CategoryRepo = await AppDataSource.getRepository(Category)
    return await CategoryRepo.update({ id }, { name })
}

export async function getCategoryByIdService(id: number) {
    const CategoryRepo = await AppDataSource.getRepository(Category)
    return await CategoryRepo.findOne({ where: { id } })
}
