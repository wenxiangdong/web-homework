export class UserNotExitsError extends Error {
    constructor(username: string) {
        super(`不存在该用户【${username}】`);
    }
}

export class PasswordIncorrectError extends Error {
    constructor() {
        super("密码错误");
    }
}

export class UserAlreadyExistsError extends Error {
    constructor(username: string) {
        super(`用户名【${username}】已经被注册`);
    }
}
