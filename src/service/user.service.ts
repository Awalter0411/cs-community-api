import { AppDataSource } from "../app/database.js"
import { User } from "../entity/user.entity.js"

export async function findUserByName(username: string) {
  const userRepo = await AppDataSource.getRepository(User)
  return await userRepo.findOne({ where: { username } })
}

export async function createUser(user: Pick<User, 'username' | 'password' | 'email' | 'phone'>) {
  const userRepo = AppDataSource.getRepository(User);
  const newUser = await userRepo.create(user);
  return await userRepo.save(newUser)
}
