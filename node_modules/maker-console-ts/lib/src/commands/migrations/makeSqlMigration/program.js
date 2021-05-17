"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseCommand_1 = __importDefault(require("../../baseCommand"));
const shelljs_1 = __importDefault(require("shelljs"));
const ora_1 = __importDefault(require("ora"));
const spinner = ora_1.default("Processing: ");
class MakeSqlMigratiomProgram {
    static async handle(modelName) {
        modelName = modelName.toLowerCase();
        spinner.start();
        spinner.color = "magenta";
        spinner.text = "Generating Migration";
        try {
            shelljs_1.default.exec("npx knex migrate:make " +
                modelName +
                " --knexfile=./SchemaSetup.ts");
            await baseCommand_1.default.success("\n" +
                modelName +
                " migration successfully generated in Database/Migrations folder");
            spinner.color = "green";
            spinner.text = "Completed";
            spinner.succeed("Done 😊😘");
        }
        catch (error) {
            shelljs_1.default.exec("npm install knex -g");
            shelljs_1.default.exec("npx knex migrate:make " +
                modelName +
                " --knexfile=./SchemaSetup.ts");
            await baseCommand_1.default.success("\n" +
                modelName +
                " migration successfully generated in Database/Migrations folder");
            spinner.color = "green";
            spinner.text = "Completed";
            spinner.succeed("Done 😊😘");
        }
    }
}
exports.default = MakeSqlMigratiomProgram;
