"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const baseCommand_1 = __importDefault(require("../baseCommand"));
class MiddlewareProgram {
    static async handle(name) {
        name = name[0].toUpperCase() + name.slice(1);
        let checkFolder = baseCommand_1.default.checkFolderExists("./App/Http/Middleware");
        if (checkFolder) {
            let doesFileExist = await baseCommand_1.default.checkFileExists("./App/Http/Middleware/" + name + "_middleware.ts");
            if (doesFileExist == false) {
                await this.nextStep(name);
            }
            else {
                return baseCommand_1.default.error(name +
                    "_middleware.ts already exist. Modify middleware name and try again");
            }
        }
    }
    static async nextStep(name) {
        fs_1.default.appendFile("./App/Http/Middleware/" + name + "_middleware.ts", this.generateMiddleware(name), function (err) {
            if (err)
                return baseCommand_1.default.error(err.errno);
            baseCommand_1.default.success(name +
                "_middleware.ts class successfully generated in App/Http/Middleware folder");
            return true;
        });
    }
    static generateMiddleware(name) {
        let body = `"use strict";
    import { Request, Response, NextFunction } from "Elucidate/HttpContext";
    import HttpResponse from "Elucidate/HttpContext/ResponseType";
        class ${name} {
          /**
           * Handle Middleware.
           * @param {Request} req
           * @param {Response} res
           * @param {Next} next
           */
          public async handle(req: Request, res: Response, next: NextFunction) {
            //UpStream
            await next();
            //DownStream
          }
        }

        export default ${name};`;
        return body;
    }
}
exports.default = MiddlewareProgram;
