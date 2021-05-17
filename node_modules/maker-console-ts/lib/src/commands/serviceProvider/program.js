"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const baseCommand_1 = __importDefault(require("../baseCommand"));
class ProviderProgram {
    static async handle(name) {
        name = name[0].toUpperCase() + name.slice(1);
        let checkFolder = baseCommand_1.default.checkFolderExists("./App/Providers");
        if (checkFolder) {
            let doesFileExist = await baseCommand_1.default.checkFileExists("./App/Providers/" + name + ".ts");
            if (doesFileExist == false) {
                await this.nextStep(name);
            }
            else {
                return baseCommand_1.default.error(name +
                    ".ts already exist. Modify service provider name and try again");
            }
        }
    }
    static async nextStep(name) {
        fs_1.default.appendFile("./App/Providers/" + name + ".ts", this.generateService(name), function (err) {
            if (err)
                return baseCommand_1.default.error(err.errno);
            baseCommand_1.default.success(name + ".ts class successfully generated in App/Providers folder");
            return true;
        });
    }
    static generateService(name) {
        let body = `"use strict";
    import ServiceProvider from "Elucidate/Support/ServiceProvider";
    
    class ${name} extends ServiceProvider{
        /**
         * Register application services.
        */
        register() {
            //
        }

        /**
         * Bootstrap any application services.
         * @return void
        */
        boot() {
           //
        }
    }

    export default ${name};`;
        return body;
    }
}
exports.default = ProviderProgram;
