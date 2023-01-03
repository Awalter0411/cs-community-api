import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
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

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    @Column({
        default: false,
    })
    isDelete: boolean
}
