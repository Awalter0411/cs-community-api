import { AppDataSource } from "../app/database.js";
import { Activity } from "../entity/activity.entity.js";

export async function createActivityService(activity: Record<string, string>) {
  const ActivityRepo = await AppDataSource.getRepository(Activity)
  const activityData = await ActivityRepo.create({ ...activity })
  return await ActivityRepo.save(activityData)
}

export async function findActivityListService() {
  const ActivityRepo = await AppDataSource.getRepository(Activity)
  return await ActivityRepo.findAndCount({ where: { isDelete: false } })
}

export async function deleteActivityService(id: number) {
  const ActivityRepo = await AppDataSource.getRepository(Activity)
  const activity = await ActivityRepo.findOne({ where: { id } })
  if (activity) {
    return await ActivityRepo.update({ id }, { isDelete: !activity.isDelete })
  } else {
    return null
  }
}

export async function updateActivityService(id: number, activity: Record<string, string>) {
  const ActivityRepo = await AppDataSource.getRepository(Activity)
  if (activity) {
    return await ActivityRepo.update({ id }, { ...activity })
  } else {
    return null
  }
}

export async function getActivityByIdService(id: number) {
  const ActivityRepo = await AppDataSource.getRepository(Activity)
  return await ActivityRepo.findOne({ where: { id, isDelete: false } })
}
