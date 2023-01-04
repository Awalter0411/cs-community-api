import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Relation, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class StarResource {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => User)
    @JoinTable()
    user: Relation<User>[]

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    @Column({
        default: false,
    })
    isDelete: boolean
}
