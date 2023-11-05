import { Elysia } from "elysia";
import { userController } from "./controllers/user.controller";
import cors from "@elysiajs/cors";
import { logger } from "@grotto/logysia";
import "reflect-metadata";
import swagger from "@elysiajs/swagger";

async function server() {
    const app = new Elysia()
        .use(logger())
        .use(swagger())
        .use(cors())
        .use(userController)
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
