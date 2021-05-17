"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const baseCommand_1 = __importDefault(require("../baseCommand"));
class EventProgram {
    static async handle(name) {
        name = name[0].toUpperCase() + name.slice(1);
        let checkFolder = baseCommand_1.default.checkFolderExists("./App/Events");
        if (checkFolder) {
            let doesFileExist = await baseCommand_1.default.checkFileExists("./App/Events/" + name + "_event.ts");
            if (doesFileExist == false) {
                await this.nextStep(name);
            }
            else {
                return baseCommand_1.default.error(name + "_event.ts already exist. Modify event name and try again");
            }
        }
    }
    static async nextStep(name) {
        fs_1.default.appendFile("./App/Events/" + name + "_event.ts", this.generateEvent(name), function (err) {
            if (err)
                return baseCommand_1.default.error(err.errno);
            baseCommand_1.default.success(name + "_event.ts class successfully generated in App/Events folder");
            return true;
        });
    }
    static generateEvent(name) {
        let body = `"use strict";
    import Emitter from "Elucidate/Emitter";

    class ${name} {
      params: any;
      /**
       * Create a new event instance.
       * @param {*} params
       */
      constructor(params:any) {
        this.params = params;
        this.listenOn();
        Emitter.emitEvent("${name}");
      }

      /**
       * Get the listener to listen to the event.
       */
      public async listenOn() {
        //
      }
    }

    export default ${name};`;
        return body;
    }
}
exports.default = EventProgram;
