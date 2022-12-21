import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
    default: false,
  })
  isDelete: boolean;
}
