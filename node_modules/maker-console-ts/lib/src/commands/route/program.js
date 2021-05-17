"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ora_1 = __importDefault(require("ora"));
const fs_1 = __importDefault(require("fs"));
const baseCommand_1 = __importDefault(require("../baseCommand"));
const shelljs_1 = __importDefault(require("shelljs"));
const spinner = ora_1.default("Processing: ");
class RouteProgram {
    static async handle(name) {
        spinner.start();
        spinner.color = "magenta";
        spinner.text = "Generating Route";
        name = name[0].toUpperCase() + name.slice(1);
        let doesFileExist = await baseCommand_1.default.checkFileExists(`./Routes/${name}/index.ts`);
        if (doesFileExist == false) {
            await this.nextStep(name);
            spinner.color = "green";
            spinner.text = "Completed";
            spinner.succeed("Completed 😊😘");
        }
        else {
            spinner.color = "red";
            spinner.text = "failed";
            spinner.fail("");
            return baseCommand_1.default.error(name + " route folder already exist. Modify route name and try again");
        }
    }
    static async nextStep(name) {
        await this.routeFolder(name);
        shelljs_1.default.mv("./output.txt", "./App/Providers/Route.ts");
    }
    static async routeFolder(name) {
        shelljs_1.default.mkdir("./Routes/" + name);
        fs_1.default.appendFile("./Routes/" + name + "/index.ts", await this.routeBody(name), function (err) {
            if (err)
                throw err;
            baseCommand_1.default.success(`${name} route successfully generated in Routes/${name}`);
        });
    }
    static async routeBody(name) {
        let body = `"use strict";
    import Route from "Elucidate/Route/manager";
    import { Request, Response, NextFunction } from "Elucidate/HttpContext";
       
    /*
    |--------------------------------------------------------------------------
    | ${name} Route File   
    |--------------------------------------------------------------------------
    |
    | Example of closure route 
    | 
    | Route.get("/",(req,res)=>{}); 
    |
    | Example of controller route.
    |
    | Route.get("/","UserController@index);
    | 
    */

    Route.group("/${name}", () => {
      //
    });
      

    //--------------------------------------------------------------------------
    export default Route.exec;
    `;
        return body;
    }
}
exports.default = RouteProgram;
