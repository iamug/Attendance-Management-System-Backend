"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pathTo = process.env.PWD;
const commander_1 = __importDefault(require("commander"));
commander_1.default.version("1.0.0").description("ExpressWebJs Command Line TS");
const config_1 = __importDefault(require("./config"));
class Console {
    /**
     * Run Maker commands
     * @param {Array} commands
     * @param {Array} kernel
     */
    static async run(commands, kernel) {
        let makerCommands = this.checkCommadsLength(commands);
        makerCommands != null
            ? await this.processMakerCommands(makerCommands)
            : null;
        let userCommand = this.checkKernelLength(kernel.commands());
        userCommand != null ? await this.processUserCommand(userCommand) : null;
        commander_1.default.parse(process.argv);
    }
    checkCommandName(name) {
        if (typeof config_1.default[name] == "string") {
            throw "Can't recreate maker commend, try renaming your command signature";
        }
    }
    static async processMakerCommands(makerCommands) {
        await makerCommands.forEach((command) => {
            let commandName = command.split("/");
            let filePath = config_1.default[`${commandName[commandName.length - 1]}`];
            Promise.resolve().then(() => __importStar(require(`./${filePath}`))).then(file => {
                file.default.handle(commander_1.default);
            });
        });
    }
    static async processUserCommand(userCommand) {
        userCommand.forEach((path) => {
            let commandPath = `${pathTo}/${path}`;
            let commandObject = require(commandPath);
            let command = new commandObject.default();
            let handle = `${command.signature}`;
            if (command.arguments.length > 0) {
                command.arguments.forEach((argument) => {
                    if (argument.mode == "REQUIRED") {
                        handle = `${handle} <${argument.name}>`;
                    }
                    else if (argument.mode == "OPTIONAL") {
                        handle = `${handle} [${argument.name}]`;
                    }
                });
                this.buildCommandWithArguments(command, handle);
            }
            else {
                commander_1.default
                    .command(handle)
                    .description(command.description)
                    .action(() => {
                    command.fire();
                });
            }
        });
    }
    static buildCommandWithArguments(command, handle) {
        let count = command.arguments.length;
        switch (count) {
            case 2:
                commander_1.default
                    .command(handle)
                    .description(command.description)
                    .action((value1, value2) => {
                    command.fire(value1, value2);
                });
                break;
            case 3:
                commander_1.default
                    .command(handle)
                    .description(command.description)
                    .action((value1, value2, value3) => {
                    command.fire(value1, value2, value3);
                });
                break;
            case 4:
                commander_1.default
                    .command(handle)
                    .description(command.description)
                    .action((value1, value2, value3, value4) => {
                    command.fire(value1, value2, value3, value4);
                });
                break;
            case 5:
                commander_1.default
                    .command(handle)
                    .description(command.description)
                    .action((value1, value2, value3, value4, value5) => {
                    command.fire(value1, value2, value3, value4, value5);
                });
                break;
            default:
                commander_1.default
                    .command(handle)
                    .description(command.description)
                    .action((value1) => {
                    command.fire(value1);
                });
                break;
        }
    }
    static checkCommadsLength(commands) {
        return commands.length > 0 ? commands : null;
    }
    static checkKernelLength(kernel) {
        return kernel.length > 0 ? kernel : null;
    }
}
exports.default = Console;
