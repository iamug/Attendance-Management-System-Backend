"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class WsControllerCommand {
    static async handle(program) {
        await program
            .command("make-ws-controller <wsControllerName>")
            .description("Create a new web socket controller class")
            .action((wsControllerName) => {
            program_1.default.handle(wsControllerName);
        });
    }
}
exports.default = WsControllerCommand;
