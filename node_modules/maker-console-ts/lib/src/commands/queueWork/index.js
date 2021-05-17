"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class QueueWorkerCommand {
    static async handle(program) {
        await program
            .command("queue-work [queueName]")
            .description("Start processing jobs on the queue as a daemon")
            .action((queueName) => {
            program_1.default.handle(queueName);
        });
    }
}
exports.default = QueueWorkerCommand;
