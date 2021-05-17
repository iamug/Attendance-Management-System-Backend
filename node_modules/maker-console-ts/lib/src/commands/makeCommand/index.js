"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class ListenerCommand {
    static async handle(program) {
        await program
            .command("make-command <commandName>")
            .description("Create a new Maker command")
            .action((commandName) => {
            program_1.default.handle(commandName);
        });
    }
}
exports.default = ListenerCommand;
