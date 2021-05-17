"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const baseCommand_1 = __importDefault(require("../baseCommand"));
class NoSqlProgram {
    static async handle(name) {
        name = name[0].toUpperCase() + name.slice(1);
        let checkFolder = baseCommand_1.default.checkFolderExists("./App/Model");
        if (checkFolder) {
            let doesFileExist = await baseCommand_1.default.checkFileExists("./App/Model/" + name + "_model.ts");
            if (doesFileExist == false) {
                await this.nextStep(name);
            }
            else {
                return baseCommand_1.default.error(name + "_model.ts already exist. Modify model name and try again");
            }
        }
    }
    static async nextStep(name) {
        fs_1.default.appendFile("./App/Model/" + name + "_model.ts", this.generateModel(name), function (err) {
            if (err)
                return baseCommand_1.default.error(err.errno);
            baseCommand_1.default.success(name + "_model.ts class successfully generated in App/Model folder");
            return true;
        });
    }
    static generateModel(name) {
        let body = `"use strict";
    import { mongoose, Schema, Document } from "Elucidate/Database/NoSQLModel";

    export interface ${name}Interface extends Document {
      //
    }

    const ${name}Schema: Schema = new Schema({
      //define the shape of your document within the collection.
    });

    const ${name} = mongoose.model<${name}Interface>("${name}", ${name}Schema);
    export default ${name};`;
        return body;
    }
}
exports.default = NoSqlProgram;
