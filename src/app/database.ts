import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import config from "./config.js";
import { User, UserRole } from "../entity/user.entity.js";
import { Category } from "../entity/category.entity.js";
import { Post } from "../entity/post.entity.js";
import { seedData } from "./seed.js";

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
