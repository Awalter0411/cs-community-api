import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config.js";
import { User } from "../entity/user.entity.js";
import { Category } from "../entity/category.entity.js";
import { Post } from "../entity/post.entity.js";
import { seedData } from "./seed.js";
import { StarPost } from "../entity/starPost.entity.js";
import { CollectionPost } from "../entity/collectionPost.entity.js";
import { Resource } from "../entity/resource.entity.js";
import { StarResource } from "../entity/starResource.entity.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.DATABASE_HOST,
  port: parseInt(config.DATABASE_PORT),
  username: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  entities: [User, Category, Post, StarPost, CollectionPost, Resource, StarResource],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    seedData();
  })
  .catch((error) => console.log(error));
