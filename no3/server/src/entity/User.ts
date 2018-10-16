import {PrimaryColumn, Entity, Column} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    public username: string;

    @Column()
    public password: string;

    @Column()
    public realName: string;
}
