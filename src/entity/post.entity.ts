import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, Relation } from "typeorm";
import { User } from "./user.entity.js";
import { Category } from "./category.entity.js";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'text' })
    content: string

    @Column()
    cover: string

    @Column({ default: 0 })
    stars: number

    @Column({ default: 0 })
    views: number

    @Column({ default: 0 })
    collections: number

    @ManyToOne(() => User, (user) => user.posts)
    user: Relation<User>;

    @ManyToMany(() => Category)
    @JoinTable()
    /**
     * why add Relation<>?:https://stackoverflow.com/questions/60363353/typeorm-onetomany-causes-referenceerror-cannot-access-entity-before-initia
     */
    categories: Relation<Category>[]

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    @Column({
        default: false,
    })
    isDelete: boolean
}
