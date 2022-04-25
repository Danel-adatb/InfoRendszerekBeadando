import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToMany
  } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import bcrypt from "bcryptjs";
import { Orders } from "./Orders";

@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    name: string;

    @Column()
    number: number;

    @Column()
    email: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @Length(4, 100)
    password: string;
}
