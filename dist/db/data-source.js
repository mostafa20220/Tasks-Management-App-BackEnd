"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const user = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const host = process.env.MONGODB_HOST;
const port = process.env.MONGODB_PORT;
const database = process.env.MONGODB_DATABASE;
exports.url = `mongodb://${user}:${password}@${host}:${port}?directConnection=true&serverSelectionTimeoutMS=2000`;
//# sourceMappingURL=data-source.js.map