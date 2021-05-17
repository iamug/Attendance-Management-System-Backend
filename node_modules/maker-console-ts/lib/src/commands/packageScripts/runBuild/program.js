"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
class CompileProgramProgram {
    static handle() {
        this.buildFile();
    }
    static buildFile() {
        if (shelljs_1.default.exec("rimraf ./build && tsc -p .").code !== 0) {
            shelljs_1.default.echo("Error: Build project command failed");
            shelljs_1.default.exit(1);
        }
    }
}
exports.default = CompileProgramProgram;
