"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class ControllerCommand {
    static async handle(program) {
        await program
            .command("make-controller <controllername>")
            .option("-r", "-resource", "Controller Resource Methods")
            .description("Create a new controller class")
            .action((controllername, resource) => {
            program_1.default.handle(controllername, resource.r);
        });
    }
}
exports.default = ControllerCommand;
