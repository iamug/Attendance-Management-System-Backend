"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const baseCommand_1 = __importDefault(require("../baseCommand"));
class ListenerProgram {
    static async handle(name) {
        name = name[0].toUpperCase() + name.slice(1);
        let checkFolder = baseCommand_1.default.checkFolderExists("./App/Listeners");
        if (checkFolder) {
            let doesFileExist = await baseCommand_1.default.checkFileExists("./App/Listeners/" + name + "_listener.ts");
            if (doesFileExist == false) {
                await this.nextStep(name);
            }
            else {
                return baseCommand_1.default.error(name +
                    "_listener.ts already exist. Modify listener name and try again");
            }
        }
    }
    static async nextStep(name) {
        fs_1.default.appendFile("./App/Listeners/" + name + "_listener.ts", this.generateListener(name), function (err) {
            if (err)
                return baseCommand_1.default.error(err.errno);
            baseCommand_1.default.success(name +
                "_listener.ts class successfully generated in App/Listeners folder");
            return true;
        });
    }
    static generateListener(name) {
        let body = `"use strict";
    import Emitter from "Elucidate/Emitter";

    class ${name} {
      /**
       * Handle the event.
       * @param {*} eventName
       * @param {*} params
       */
      constructor(eventName:string, params:any) {
        Emitter.bind(eventName, () => {
          //Do something
        });
      }
    }

    export default ${name};`;
        return body;
    }
}
exports.default = ListenerProgram;
