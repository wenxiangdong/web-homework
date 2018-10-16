import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import "@tsed/swagger";
import {$log} from "ts-log-debug";
import {Cors} from "./middlewares/Cors";

@ServerSettings({
    rootDir: __dirname,
    acceptMimes: ["application/json"],
    logger: {
        debug: false,
        logRequest: true,
        requestFields: ["reqId", "method", "url", "headers", "query", "params", "body", "duration"]
    },
    swagger: {
        path: "/api-docs"
    },
    typeorm: [
        {
            name: "default",
            type: "mysql",
            host: "47.106.233.50",
            port: 5432,
            username: "root",
            password: "970603",
            database: "WebHomework",
            synchronize: true,
            logging: false,
            entities: [
                `${__dirname}/entity/*{.ts,.js}`
            ],
            migrations: [
                `${__dirname}/migrations/*{.ts,.js}`
            ],
            subscribers: [
                `${__dirname}/subscriber/*{.ts,.js}`
            ]
        }],
  calendar: {
    token: true
  }
})
export class Server extends ServerLoader {

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    $onMountingMiddlewares(): void | Promise<any> {

        const cookieParser = require("cookie-parser"),
            bodyParser = require("body-parser"),
            compress = require("compression"),
            methodOverride = require("method-override");


        this
            .use(Cors)
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));

        return null;
    }

    $onReady() {
        $log.debug("Server initialized");
    }

    $onServerInitError(error): any {
        $log.error("Server encounter an error =>", error);
    }
}
