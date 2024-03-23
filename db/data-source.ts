import { config } from 'dotenv';
config();

const user = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const host = process.env.MONGODB_HOST;
// const host = "mongodb";
const port = process.env.MONGODB_PORT;
const database = process.env.MONGODB_DATABASE;

export const url = `mongodb://${user}:${password}@${host}:${port}?directConnection=true&serverSelectionTimeoutMS=2000`;
