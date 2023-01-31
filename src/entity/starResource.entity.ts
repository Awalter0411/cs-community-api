import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

@Entity()
export class StarResource {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    resourceId: number

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    @Column({
        default: false,
    })
    isDelete: boolean
}
