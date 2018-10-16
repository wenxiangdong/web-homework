import {Controller, QueryParams, Required, Post, BodyParams} from "@tsed/common";
import {HttpResponse} from "../../types/HttpResponse";
import {$log} from "ts-log-debug";
import {UsersService} from "../../services/users/UsersService";
import {Example} from "@tsed/swagger";

/**
 * 用户提交的表单
 * 登录或注册
 */
interface UserForm {
    username: string;
    password: string;
}

@Controller("/users")
export class UsersCtrl {

    constructor(private usersService: UsersService) {}

    /**
     * 用户登录
     * @param {UserForm} user 用户提交的表单
     */
    @Post("/login")
    async login(
        @Required()
        @BodyParams() user: UserForm
    ): Promise<HttpResponse> {
        try {
            let res = await this.usersService.login(
                user.username,
                user.password
            );
            return HttpResponse.generateSuccessResponse<string>(res);
        } catch (e) {
            $log.info(e.message);
            return HttpResponse.generateErrorResponse(e.message);
        }
    }
}
