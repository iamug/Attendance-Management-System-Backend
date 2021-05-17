"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class providerCommand {
    static async handle(program) {
        await program
            .command("make-provider [providerName]")
            .description("Create new service provider class")
            .action((providerName) => {
            program_1.default.handle(providerName);
        });
    }
}
exports.default = providerCommand;
