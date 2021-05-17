"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class MiddlewareCommand {
    static async handle(program) {
        await program
            .command("make-middleware <middlewarename>")
            .description("Create a new middleware class")
            .action((middlewarename) => {
            program_1.default.handle(middlewarename);
        });
    }
}
exports.default = MiddlewareCommand;
