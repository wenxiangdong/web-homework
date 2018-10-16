import {Service} from "@tsed/common";
import {UserOrmService} from "../typeorm/UserOrmService";

@Service()
export class UsersService {
    constructor(
        private userOrmService: UserOrmService
    ) {}
    public async login(username: string, password: string) {
        
        return "token";
    }
}
