import {Service} from "@tsed/common";
import {ORMFindOneByKey, OrmHelpService, ORMInsert} from "./OrmHelpService";
import {User} from "../../entity/User";
import {InsertResult} from "typeorm";

@Service()
export class UserOrmService implements ORMFindOneByKey<User>, ORMInsert<User> {
    constructor(
        private ormHelp: OrmHelpService
    ) {}

    public findOneByKey(key: string | number): Promise<User> {
        let entityManager = this.ormHelp.getEntityManager();
        return entityManager.findOne<User>(User, key);
    }

    public insert(data: User[]): Promise<any> {
        let entity = this.ormHelp.getEntityManager();
        return entity.insert(User, data);
        // InsertResult
    }
}
