"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class EventCommand {
    static async handle(program) {
        await program
            .command("make-event <eventname>")
            .description("Create a new event class")
            .action((eventname) => {
            program_1.default.handle(eventname);
        });
    }
}
exports.default = EventCommand;
