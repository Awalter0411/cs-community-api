import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  link: string

  @Column()
  cover: string

  @Column()
  content: string

  @Column()
  date: Date

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date

  @Column({
    default: false,
  })
  isDelete: boolean;
}
