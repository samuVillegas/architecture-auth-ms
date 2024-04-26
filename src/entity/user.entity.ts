import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        select: false
    })
    password: string;

    @Column()
    is_ambassador: boolean;

    @Column()
    user_id: number;

    @Column({
        unique: true
    })
    email: string;
}
