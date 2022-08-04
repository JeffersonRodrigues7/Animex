import express from "express";
import cors from "cors";
import { routes } from "./routes";

/**
 * Express é um framework que facilita o desenvolvimento de aplicações fornendo um sistema de rotas,
 * gerenciamento de requisições http de forma mais fácil, entre outras
 */

/**
 * Retorno o app que iniciará o banco de dados
 */
class App {
  server: any;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
