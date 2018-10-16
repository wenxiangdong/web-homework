import {Controller, Get, RouteService} from "@tsed/common";

@Controller("/rest")
export class RestCtrl {

    constructor(private routeService: RouteService) {

    }

    @Get("/")
    public getRoutes() {
        console.log(new Base().constructor.name, new Son().constructor.name);
        return this.routeService.getAll();
    }
}

class Base {}

class Son extends Base {}
