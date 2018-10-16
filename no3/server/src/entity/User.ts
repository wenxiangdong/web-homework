import {PrimaryColumn, Entity, Column} from "typeorm";

@Entity()
export class User {
    constructor(username: string, password: string, realName: string) {
        this.username = username;
        this.password = password;
        this.realName = realName;
    }

    @PrimaryColumn()
    public username: string;

    @Column()
    public password: string;

    @Column()
    public realName: string;
}
