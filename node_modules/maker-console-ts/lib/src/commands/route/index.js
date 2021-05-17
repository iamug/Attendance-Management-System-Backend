"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class RouteCommand {
    static async handle(program) {
        await program
            .command("make-route <routename>")
            .description("Create a new route folder")
            .action((routename) => {
            program_1.default.handle(routename);
        });
    }
}
exports.default = RouteCommand;
