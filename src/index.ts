import { Elysia } from "elysia";
import { AppDataSource } from "./data-source";
import { userController } from "./controllers/user.controller";
import cors from "@elysiajs/cors";
import { logger } from "@grotto/logysia";
import path from "path";
import "reflect-metadata";
import swagger from "@elysiajs/swagger";
import fs from "fs";

let oldLogger = console.log;
let newLogger = (...data: any[]) => {
    const c = data.slice(-1);
    if (typeof c === "boolean" && c === true) {
        oldLogger(data);
    } else {
        fs.appendFileSync(
            path.join(__dirname, "..", "logs", "test.log"),
            `${JSON.stringify(data)}\n`
        );
    }
};

console.log = newLogger;

await Bun.write(path.join(__dirname, "..", "logs", "test.log"), "testing");
async function server() {
    const db = await AppDataSource.initialize();
    const app = new Elysia()
        .use(logger())
        .use(swagger())
        .use(cors())
        .use(userController(db))
        .listen(Bun.env.PORT || 4000);
    console.log(
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
}

try {
    server();
} catch (error) {
    console.log(error);
}
