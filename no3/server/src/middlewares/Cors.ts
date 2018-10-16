import {Middleware, Res} from "@tsed/common";
import * as Express from "express";

/**
 * 跨域解决方案
 */
@Middleware()
export class Cors {
    public use(@Res() res: Express.Response) {
        res.header("Access-Control-Allow-Origin", "http://localhost:8081");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
    }
}
