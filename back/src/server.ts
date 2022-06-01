import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { db } from "./database/db-connection";

app.listen(3001, async () => {
    try {
        await db.sync();
        console.log(`Connected to the database`);
    } catch (error) {
        console.error("Failed to connect to the database", error);
    }
});
