import { AppDataSource } from "../app/database.js";
import { Resource } from "../entity/resource.entity.js";

export async function createResourceService(resource: Pick<Resource, 'name' | 'link' | 'cover' | 'content'>) {
  const ResourceRepo = await AppDataSource.getRepository(Resource)
  const result = await ResourceRepo.create({ ...resource })
  return await ResourceRepo.save(result)
}

export async function findResourceListService() {
  const ResourceRepo = await AppDataSource.getRepository(Resource)
  return await ResourceRepo.findAndCount({ where: { isDelete: false } })
}

export async function findCategoryByIdService(id: number) {
  const ResourceRepo = await AppDataSource.getRepository(Resource)
  return await ResourceRepo.findOne({ where: { id, isDelete: false } })
}

export async function deleteResourceService(id: number) {
  const ResourceRepo = await AppDataSource.getRepository(Resource)
  return await ResourceRepo.update({ id }, { isDelete: true })
}

export async function getResourceInfoByIdService(id: number) {
  const ResourceRepo = await AppDataSource.getRepository(Resource)
  return await ResourceRepo.findOne({ where: { id, isDelete: false } })
}
