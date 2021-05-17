"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
class RunStartProgram {
    static async handle() {
        this.runProductionServer();
    }
    static runProductionServer() {
        if (shelljs_1.default.exec("tsc && node -r tsconfig-paths/register -r ts-node/register build/app.js").code !== 0) {
            shelljs_1.default.echo("Error: Run production server command failed");
            shelljs_1.default.exit(1);
        }
    }
}
exports.default = RunStartProgram;
