"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class SqlCommand {
    static async handle(program) {
        await program
            .command("make-sql-model <modelname>")
            .option("-m", "-migration", "Generation migration with sql model")
            .description("Create a new sql model class")
            .action((modelname, resource) => {
            program_1.default.handle(modelname, resource.m);
        });
    }
}
exports.default = SqlCommand;
