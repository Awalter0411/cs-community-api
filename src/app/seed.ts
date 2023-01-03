/**
 * seed data into database
 */

import mockjs from "mockjs";
import { Repository } from "typeorm";
import { Category } from "../entity/category.entity.js";
import { User, UserRole } from "../entity/user.entity.js";
import { cryptoPassword } from "../service/user.service.js";
import config from "./config.js";
import { AppDataSource } from "./database.js";

const { Random } = mockjs

export async function seedData() {
    const UserRepo = AppDataSource.getRepository(User);
    const CategoryRepo = AppDataSource.getRepository(Category)
    await seedUser(UserRepo);
    await seedCategory(CategoryRepo)
}

async function seedCategory(CategoryRepo: Repository<Category>) {
    const cates = await CategoryRepo.find()
    if (cates.length > 3) {
        return
    }
    const cate = ['前端', '后端', 'Java', 'Node']
    for (let i = 0; i < cate.length; i++) {
        const newCate = await CategoryRepo.create({
            name: cate[i]
        })
        await CategoryRepo.save(newCate)
    }
}

async function seedUser(UserRepo: Repository<User>) {
    const users = await UserRepo.find({ take: 10 });
    if (users.length > 5) {
        return;
    }
    const password = await cryptoPassword(config.ADMIN_PASSWORD)
    const admin = await UserRepo.create({
        username: 'admin',
        password,
        email: Random.email(),
        phone: Random.string(),
        role: UserRole.ADMIN
    });
    await UserRepo.save(admin);
    for (let i = 0; i < 10; i++) {
        const newUser = await UserRepo.create({
            username: Random.cname(),
            password: Random.string(),
            email: Random.email(),
            phone: Random.string(),
        });
        UserRepo.save(newUser);
    }
}
