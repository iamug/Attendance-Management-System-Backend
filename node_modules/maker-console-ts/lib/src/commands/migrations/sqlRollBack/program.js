"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseCommand_1 = __importDefault(require("../../baseCommand"));
const shelljs_1 = __importDefault(require("shelljs"));
const ora_1 = __importDefault(require("ora"));
const spinner = ora_1.default("Processing: ");
class SqlRollBackProgram {
    static async handle(all) {
        return all ? this.runAll() : this.runNormal();
    }
    static async runAll() {
        spinner.start();
        spinner.color = "magenta";
        spinner.text = "Rolling back all the completed migrations: ";
        try {
            shelljs_1.default.exec("npx knex migrate:rollback --all --knexfile=./SchemaSetup.ts", (error, success) => {
                if (error) {
                    baseCommand_1.default.error(error);
                    spinner.color = "red";
                    spinner.text = "failed";
                    spinner.fail("");
                }
                if (success) {
                    baseCommand_1.default.success(success);
                    spinner.color = "green";
                    spinner.text = "Completed";
                    spinner.succeed("Done 😊😘");
                }
            });
        }
        catch (error) {
            shelljs_1.default.exec("npm install knex -g");
            shelljs_1.default.exec("npx knex migrate:rollback --all --knexfile=./SchemaSetup.ts", (error, success) => {
                if (error) {
                    baseCommand_1.default.error(error);
                    spinner.color = "red";
                    spinner.text = "failed";
                    spinner.fail("");
                }
                if (success) {
                    baseCommand_1.default.success(success);
                    spinner.color = "green";
                    spinner.text = "Completed";
                    spinner.succeed("Done 😊😘");
                }
            });
        }
    }
    static async runNormal() {
        spinner.start();
        spinner.color = "magenta";
        spinner.text = "Rolling back the last batch of migrations: ";
        try {
            shelljs_1.default.exec("npx knex migrate:rollback --knexfile=./SchemaSetup.ts", (error, success) => {
                if (error) {
                    baseCommand_1.default.error(error);
                    spinner.color = "red";
                    spinner.text = "failed";
                    spinner.fail("");
                }
                if (success) {
                    baseCommand_1.default.success(success);
                    spinner.color = "green";
                    spinner.text = "Completed";
                    spinner.succeed("Done 😊😘");
                }
            });
        }
        catch (error) {
            shelljs_1.default.exec("npm install knex -g");
            shelljs_1.default.exec("npx knex migrate:rollback --knexfile=./SchemaSetup.ts", (error, success) => {
                if (error) {
                    baseCommand_1.default.error(error);
                    spinner.color = "red";
                    spinner.text = "failed";
                    spinner.fail("");
                }
                if (success) {
                    baseCommand_1.default.success(success);
                    spinner.color = "green";
                    spinner.text = "Completed";
                    spinner.succeed("Done 😊😘");
                }
            });
        }
    }
}
exports.default = SqlRollBackProgram;
