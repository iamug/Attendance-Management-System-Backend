"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class AuthCommand {
    static async handle(program) {
        await program
            .command("run-dev")
            .description("Run developement server")
            .action(() => {
            program_1.default.handle();
        });
    }
}
exports.default = AuthCommand;
