"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let commands;
commands = {
    "make-auth": "commands/auth",
    "make-controller": "commands/controller",
    "make-event": "commands/event",
    "make-listener": "commands/listener",
    "make-middleware": "commands/middleware",
    "make-nosql-model": "commands/nosqlModel",
    "make-request": "commands/request",
    "make-route": "commands/route",
    "make-sql-model": "commands/sqlModel",
    "make-ws-controller": "commands/wsController",
    "make-sql-migration": "commands/migrations/makeSqlMigration",
    "make-command": "commands/makeCommand",
    "make-job": "commands/job",
    "run-schedule": "commands/schedule",
    "run-sql-migration": "commands/migrations/runSqlMigration",
    "show-sql-list": "commands/migrations/showSqlList",
    "sql-rollback": "commands/migrations/sqlRollBack",
    "sql-rolldown": "commands/migrations/sqlRollDown",
    "sql-rollup": "commands/migrations/sqlRollUp",
    "queue-work": "commands/queueWork",
    "make-provider": "commands/serviceProvider",
    "run-dev": "commands/packageScripts/runDev",
    "run-build": "commands/packageScripts/runBuild",
    "run-start": "commands/packageScripts/runStart"
};
exports.default = commands;
