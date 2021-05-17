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
class SqlProgram {
    static async handle(name, resource = null) {
        name = name[0].toUpperCase() + name.slice(1);
        let check = await baseCommand_1.default.checkFileExists("./App/Model/" + name + "_model.ts");
        if (check == false) {
            await this.createModel(name, resource);
        }
        else {
            return baseCommand_1.default.error(`${name} Sql model class already exists`);
        }
    }
    static async createModel(modelName, resource) {
        if (resource == "Generation migration with sql model") {
            spinner.start();
            spinner.color = "magenta";
            spinner.text = "Generating Model";
            fs_1.default.appendFile("./App/Model/" + modelName + "_model.ts", await this.modelBodyWithMigration(modelName), function (err) {
                if (err)
                    baseCommand_1.default.error(err);
                baseCommand_1.default.success("\n" +
                    modelName +
                    "_model.ts class successfully generated in App/Model folder");
                spinner.color = "green";
                spinner.text = "Completed";
                spinner.succeed("Done 😊😘");
            });
        }
        else {
            spinner.start();
            spinner.color = "magenta";
            spinner.text = "Generating Model";
            fs_1.default.appendFile("./App/Model/" + modelName + "_model.ts", this.modelBody(modelName), function (err) {
                if (err)
                    baseCommand_1.default.error(err);
                baseCommand_1.default.success("\n" +
                    modelName +
                    "_model.ts class successfully generated in App/Model folder");
                spinner.color = "green";
                spinner.text = "Completed";
                spinner.succeed("Done 😊😘");
            });
        }
    }
    static modelBody(name) {
        let tableName = (name = name[0].toLowerCase() + name.slice(1));
        let modelName = (name = name[0].toUpperCase() + name.slice(1));
        let body = `"use strict";
    import {Model} from "Elucidate/Database/Model";
    class ${modelName} extends Model{
      // Table name
      static tableName = "${tableName}"
      
    }

    export default ${modelName};`;
        return body;
    }
    static async modelBodyWithMigration(modelName) {
        modelName = modelName.toLowerCase();
        try {
            shelljs_1.default.exec("npx knex migrate:make " + modelName + " --knexfile=./SchemaSetup.ts");
            await baseCommand_1.default.success(modelName +
                " migration successfully generated in Database/Migrations folder");
            return this.modelBody(modelName);
        }
        catch (error) {
            shelljs_1.default.exec("npm install knex -g");
            shelljs_1.default.exec("npx knex migrate:make " + modelName + " --knexfile=./SchemaSetup.ts");
            await baseCommand_1.default.success(modelName +
                " migration successfully generated in Database/Migrations folder");
            return this.modelBody(modelName);
        }
    }
}
exports.default = SqlProgram;
