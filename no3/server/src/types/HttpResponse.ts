export class HttpResponse<T = any> {
    /**
     * @param result 请求结果，一般为成功或失败
     * @param data 实际数据
     * @param errorMsg 错误的自然语言描述
     */
    constructor(
        public result: HttpResults,
        public data: T,
        public errorMsg: string
    ) {}

    static generateSuccessResponse<T = any>(data: T): HttpResponse<T> {
        return new HttpResponse<T>(
            HttpResults.SUCCESS,
            data,
            null
        );
    }

    static generateErrorResponse(errorMsg: string): HttpResponse {
        return new HttpResponse(
            HttpResults.SUCCESS,
            null,
            errorMsg
        );
    }
}

export enum HttpResults {
    SUCCESS,
    ERROR
}
