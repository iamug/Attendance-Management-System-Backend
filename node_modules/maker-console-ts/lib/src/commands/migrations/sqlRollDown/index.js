"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class SqlRollDownCommand {
    static async handle(program) {
        await program
            .command("sql-rolldown [migrationName]")
            .alias("sqlrd")
            .description("Undo the last or specific migration that was run")
            .action((migrationName) => {
            program_1.default.handle(migrationName);
        });
    }
}
exports.default = SqlRollDownCommand;
