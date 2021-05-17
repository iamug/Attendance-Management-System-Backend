"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class NoSqlCommand {
    static async handle(program) {
        await program
            .command("make-nosql-model <modelname>")
            .description("Create a new nosql model class")
            .action((modelname) => {
            program_1.default.handle(modelname);
        });
    }
}
exports.default = NoSqlCommand;
