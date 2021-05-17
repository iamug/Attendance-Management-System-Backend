"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class RequestCommand {
    static async handle(program) {
        await program
            .command("make-request <requestname>")
            .description("Create a new request class")
            .action((requestname) => {
            program_1.default.handle(requestname);
        });
    }
}
exports.default = RequestCommand;
