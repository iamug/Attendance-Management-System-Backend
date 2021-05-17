"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseCommand_1 = __importDefault(require("../../baseCommand"));
const shelljs_1 = __importDefault(require("shelljs"));
const ora_1 = __importDefault(require("ora"));
const spinner = ora_1.default("Processing: ");
class SqlRollDownProgram {
    static async handle(name) {
        return name
            ? await this.undoSpecifiedMigration(name)
            : await this.undoLastMigraation();
    }
    //Undo the last migration that was run
    static async undoLastMigraation() {
        spinner.start();
        spinner.color = "magenta";
        spinner.text = "Undoing the last migration that was run: ";
        try {
            shelljs_1.default.exec("npx knex migrate:down --knexfile=./SchemaSetup.ts", (error, success) => {
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
            shelljs_1.default.exec("npx knex migrate:down --knexfile=./SchemaSetup.ts", (error, success) => {
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
    /**
     * Undo the specified migration that was run
     * @param {String} name
     */
    static async undoSpecifiedMigration(name) {
        spinner.start();
        spinner.color = "magenta";
        spinner.text = "Undoing " + name + " migration that was run: ";
        try {
            shelljs_1.default.exec("npx knex migrate:down " + name + "--knexfile=./SchemaSetup.ts", (error, success) => {
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
            shelljs_1.default.exec("npx knex migrate:down " + name + "--knexfile=./SchemaSetup.ts", (error, success) => {
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
exports.default = SqlRollDownProgram;
