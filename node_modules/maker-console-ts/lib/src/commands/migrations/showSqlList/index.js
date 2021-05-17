"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class ShowSqlListCommand {
    static async handle(program) {
        await program
            .command("show-sql-list")
            .description("Show list of both completed and pending migrations")
            .action(() => {
            program_1.default.handle();
        });
    }
}
exports.default = ShowSqlListCommand;
