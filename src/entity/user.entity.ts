import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Relation } from "typeorm";
import { Post } from "./post.entity.js";

export enum UserRole {
  ADMIN = 'admin',
  AUDITOR = 'auditor',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  job: string;

  @Column({
    nullable: true,
  })
  company: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole

  @OneToMany(() => Post, (post) => post.user)
  posts: Relation<Post>[];

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date

  @Column({
    default: false,
  })
  isDelete: boolean;
}
