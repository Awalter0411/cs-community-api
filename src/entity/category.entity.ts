import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    create_at: Date 

    @UpdateDateColumn()
    update_at: Date 

    @Column({
        default: false,
    })
    isDelete: boolean;
}
