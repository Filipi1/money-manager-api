import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user: string

    @Column()
    password: string

    @Column()
    name: string
}

export class UserAuth {
    user: string
    password: string
}