import crypto from 'crypto'
import { AppDataSource } from "../app/database.js"
import { User } from "../entity/user.entity.js"

export async function findUserByNameService(username: string) {
  const userRepo = await AppDataSource.getRepository(User)
  return await userRepo.findOne({ where: { username, isDelete: false } })
}

export async function findUserByPhoneService(phone: string) {
  const userRepo = await AppDataSource.getRepository(User)
  return await userRepo.findOne({ where: { phone, isDelete: false } })
}

export async function findUserByEmailService(phone: string) {
  const userRepo = await AppDataSource.getRepository(User)
  return await userRepo.findOne({ where: { phone, isDelete: false } })
}

export async function createUser(user: Pick<User, 'username' | 'password' | 'email' | 'phone'>) {
  const userRepo = AppDataSource.getRepository(User);
  const isExistName = await findUserByNameService(user.username) ? '用户名已存在' : ''
  const isExistPhone = await findUserByPhoneService(user.phone) ? '邮箱已绑定' : ''
  const isExistEmail = await findUserByEmailService(user.email) ? '电话已绑定' : ''
  const map = {
    isExistName,
    isExistPhone,
    isExistEmail
  }
  for (const key in map) {
    if (key) {
      return [false, key]
    }
  }
  user.password = await cryptoPassword(String(user.password))
  const newUser = await userRepo.create(user);
  return await userRepo.save(newUser)
}

export async function cryptoPassword(password: string) {
  const hash = crypto.createHash('md5')
  hash.update(password)
  return hash.digest('hex')
}

export async function findAllUserListService(pageNum: number, pageSize: number) {
  const userRepo = AppDataSource.getRepository(User);
  return await userRepo.find({ where: { isDelete: false }, take: pageSize, skip: (pageNum - 1) * pageSize })
}

export async function updateUserService(user: Required<User>) {
  const { username = '', password } = user
  const userRepo = AppDataSource.getRepository(User);
  if (password) {
    user.password = (await cryptoPassword(String(password)))
  }
  return await userRepo.createQueryBuilder("user").update({ ...user }).where("user.username = :username", { username }).execute()
}

export async function findUserByIdService(id: number) {
  const UserRepo = AppDataSource.getRepository(User);
  return await UserRepo.findOne({ where: { id, isDelete: false } })
}
