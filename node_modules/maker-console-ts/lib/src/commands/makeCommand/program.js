"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const baseCommand_1 = __importDefault(require("../baseCommand"));
class ConsoleProgram {
    static async handle(name) {
        name = name[0].toUpperCase() + name.slice(1);
        let checkFolder = baseCommand_1.default.checkFolderExists("./App/Console/Commands");
        if (checkFolder) {
            let doesFileExist = await baseCommand_1.default.checkFileExists("./App/Console/Commands/" + name + "_command.ts");
            if (doesFileExist == false) {
                await this.nextStep(name);
            }
            else {
                return baseCommand_1.default.error(name + "_command.ts already exist. Modify command name and try again");
            }
        }
    }
    static async nextStep(name) {
        fs_1.default.appendFile("./App/Console/Commands/" + name + "_command.ts", this.generateCommand(name), function (err) {
            if (err)
                return baseCommand_1.default.error(err.errno);
            baseCommand_1.default.success(name +
                "_command.ts class successfully generated in App/Console/Commands folder");
            return true;
        });
    }
    static generateCommand(name) {
        let body = `"use strict";
    import Command from "maker-console-ts";

    class ${name} extends Command {
      signature: string;
      arguments: any[];
      description: string;
      constructor() {
        super();
        //The name or signature of the console command.
        this.signature = "";
    
        /**
         * The name and mode of the console command argument.
         * name is the name of the argument while mode can be REQUIRED or OPTIONAL
         * Example [{name: "Debug", mode: "REQUIRED"},{name: "Task", mode: "REQUIRED"}]
         */
        this.arguments = [];
    
        /**
         * The console command description.
         * @var string
         */
        this.description = "";
    
        super.checkCommandName(this.signature);
      }
    
      /**
       * Execute the console command.
       *
       * @return mixed
       */
      fire() {
        //
      }
    }
    
    export default ${name};`;
        return body;
    }
}
exports.default = ConsoleProgram;
