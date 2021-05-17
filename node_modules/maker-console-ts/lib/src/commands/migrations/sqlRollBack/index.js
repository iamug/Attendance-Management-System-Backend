"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class SqlRollBackCommand {
    static async handle(program) {
        await program
            .command("sql-rollback")
            .option("-all", "-all", "Rollback all completed migrations")
            .alias("sqlrb")
            .description("Rollback the last batch of migrations")
            .action((all) => {
            program_1.default.handle(all.r);
        });
    }
}
exports.default = SqlRollBackCommand;
