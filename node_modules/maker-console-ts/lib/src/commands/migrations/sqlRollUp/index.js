"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class SqlRollUpCommand {
    static async handle(program) {
        await program
            .command("sql-rollup [migrationName]")
            .alias("sqlru")
            .description("Run the next or specific migration that has not yet been run")
            .action((migrationName) => {
            program_1.default.handle(migrationName);
        });
    }
}
exports.default = SqlRollUpCommand;
