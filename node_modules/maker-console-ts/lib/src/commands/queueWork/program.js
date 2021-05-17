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
const baseCommand_1 = __importDefault(require("../baseCommand"));
require('dotenv').config();
let configQueuePath = `${__dirname}/../../../../../../Config/queue`;
let tsJobDirectories = `${__dirname}/../../../../../../App/Jobs`;
//@ts-ignore
const fs_1 = __importDefault(require("fs"));
class QueueWorkerProgram {
    static async handle(name) {
        await Promise.resolve().then(() => __importStar(require(configQueuePath))).then(file => {
            let Config = file.default;
            switch (Config.default) {
                case "rabbitmq":
                    this.consumeViaRabbitmq(name, Config);
                    break;
                default:
                    break;
            }
        });
    }
    static consumeViaRabbitmq(jobQueue = null, Config) {
        let queue = jobQueue;
        const amqp = require("amqplib/callback_api");
        try {
            amqp.connect(`${Config.connections[Config.default].host}:${Config.connections[Config.default].port}`, (error, connect) => {
                if (error)
                    throw error;
                if (queue == null)
                    queue = Config.connections[Config.default].queue;
                connect.createChannel((channelError, channel) => {
                    if (channelError)
                        baseCommand_1.default.error(channelError.message);
                    channel.assertQueue(queue);
                    baseCommand_1.default.success(`[*] Waiting for messages in ${queue} queue. To exit press CTRL+C`);
                    channel.consume(queue, (msg) => {
                        baseCommand_1.default.success(`Received ${msg.content.toString()}`);
                        let data = JSON.parse(msg.content.toString());
                        this.callHandlers(data);
                        channel.ack(msg);
                    });
                });
            });
        }
        catch (error) {
            baseCommand_1.default.error(error.message);
        }
    }
    static callHandlers(msg = null) {
        fs_1.default.readdirSync(`${tsJobDirectories}/`).forEach(async (file) => {
            await Promise.resolve().then(() => __importStar(require(`${tsJobDirectories}/${file}`))).then((f) => {
                let jobObject = f.default;
                let job = new jobObject();
                if (job.signature == msg.signature) {
                    try {
                        job.handle(msg.data);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            });
        });
    }
}
exports.default = QueueWorkerProgram;
