"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class JobCommand {
    static async handle(program) {
        await program
            .command("make-job [jobName]")
            .description("Create a new job class")
            .action((jobName) => {
            program_1.default.handle(jobName);
        });
    }
}
exports.default = JobCommand;
