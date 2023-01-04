import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, Relation } from "typeorm";

@Entity()
export class CollectionPost {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    postId: number

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    @Column({
        default: false,
    })
    isDelete: boolean
}
