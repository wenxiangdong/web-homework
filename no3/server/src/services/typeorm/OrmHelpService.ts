import {Service, AfterRoutesInit} from "@tsed/common";
import {TypeORMService} from "@tsed/typeorm";
import {Connection, EntityManager} from "typeorm";

@Service()
export class OrmHelpService implements AfterRoutesInit {
    private connection: Connection;
    constructor(
        private typeORMService: TypeORMService
    ) {}

    $afterRoutesInit(): void | Promise<any> {
        this.connection = this.typeORMService.get();
        return undefined;
    }

    public getEntityManager(): EntityManager {
        return this.connection.createEntityManager();
    }
}


export interface ORMFindAll<T> {
    findAll(params): Promise<T[]>;
}

export interface ORMFindOneByKey<T> {
    findOneByKey(key: string | number): Promise<T>;
}

export interface ORMInsert<T> {
    insert(data: T[]): Promise<any>;
}
