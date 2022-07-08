import * as dotenv from "dotenv";
import app from "./app";
import { db } from "./database/db-connection";

dotenv.config();

app.listen(process.env.BACKEND_LISTEN_PORT!, async () => {
  try {
    await db.sync();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
});
