"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class ListenerCommand {
    static async handle(program) {
        await program
            .command("make-listener <listenername>")
            .description("Create a new listener class")
            .action((listenername) => {
            program_1.default.handle(listenername);
        });
    }
}
exports.default = ListenerCommand;
