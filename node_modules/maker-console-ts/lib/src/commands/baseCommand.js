"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const ora_1 = __importDefault(require("ora"));
class BaseCommand {
    static progress() {
        let spinner = ora_1.default;
        return spinner;
    }
    static async error(err) {
        console.log(chalk_1.default.red(`Error: ${err}`));
    }
    static async success(message) {
        console.log(chalk_1.default.green(message));
    }
    static warning(message) {
        console.log(chalk_1.default.yellow(message));
    }
    static async checkFileExists(file) {
        return fs_1.default.promises
            .access(file, fs_1.default.constants.F_OK)
            .then(() => true)
            .catch(() => false);
    }
    static checkFolderExists(name) {
        fs_1.default.access(name, function (err) {
            if (err && err.code === "ENOENT") {
                fs_1.default.mkdir(name, (err) => {
                    if (err) {
                        BaseCommand.error(err);
                        return false;
                    }
                });
            }
        });
        return true;
    }
}
exports.default = BaseCommand;
