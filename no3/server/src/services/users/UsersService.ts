import {Service} from "@tsed/common";
import {UserOrmService} from "../typeorm/UserOrmService";
import {Md5} from "ts-md5";
import {$log} from "ts-log-debug";
import {PasswordIncorrectError, UserAlreadyExistsError, UserNotExitsError} from "./UserServiceError";
import {User} from "../../entity/User";

@Service()
export class UsersService {
    constructor(
        private userOrmService: UserOrmService
    ) {}
    public async login(username: string, password: string) {
        const pswMd5 = Md5.hashStr(password);
        $log.debug(pswMd5);
        try {
            let user = await this.userOrmService.findOneByKey(username);
            if (user) {
                if (user.password === pswMd5) {
                    return user;
                } else {
                    throw new PasswordIncorrectError();
                }
            } else {
                throw new UserNotExitsError(username);
            }
        } catch (e) {
            $log.debug(e.message);
            throw e;
        }
    }

    public async signin(username: string, password: string) {
        try {
            let user = await this.userOrmService.findOneByKey(username);
            if (!user) {
                user = new User(username, Md5.hashStr(password).toString(), "");
                await this.userOrmService.insert([user]);
            } else {
                throw new UserAlreadyExistsError(username);
            }
        } catch (e) {
            throw e;
        }
    }
}
