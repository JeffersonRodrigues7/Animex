import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

/**
 * configurando e exportando os dados o banco de dados utilizado
 */
export const db: Sequelize = new Sequelize(process.env.DATABASE_NAME!, process.env.DATABASE_USER!, process.env.DATABASE_PASS!, {
  dialect: "mysql",
  host: process.env.DATABASE_HOST!,
  port: +process.env.DATABASE_PORT!,
});
