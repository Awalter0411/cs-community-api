import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import mockjs from "mockjs";
import config from "./config.js";
import { User } from "../entity/user.entity.js";
import { Category } from "../entity/category.entity.js";
import { Post } from "../entity/post.entity.js";

const { Random } = mockjs;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.DATABASE_HOST,
  port: parseInt(config.DATABASE_PORT),
  username: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  entities: [User, Category, Post],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    seedData();
  })
  .catch((error) => console.log(error));

async function seedData() {
  const userRepo = AppDataSource.getRepository(User);
  for (let i = 0; i < 20; i++) {
    await seedUser(userRepo);
  }
}

async function seedUser(userRepo: Repository<User>) {
  const users = await userRepo.find({ take: 10 });
  if (users.length > 5) {
    return;
  }
  const newUser = await userRepo.create({
    username: Random.cname(),
    password: Random.string(),
    email: Random.email(),
    phone: Random.string(),
  });
  userRepo.save(newUser);
}
