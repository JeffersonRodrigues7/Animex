import express from "express";
import UserController from "./controllers/UserController";
import authMiddleware from "./middlewares/auth";

const routes = express.Router();

routes.post("/users", authMiddleware, UserController.create);
routes.post("/users/login/", UserController.findLogin);

routes.get("/users/:userID", UserController.findOne);
routes.get("/users/userName/:userName", UserController.findOneByName);
routes.get("/users/email/:email", UserController.findOneByEmail);

export { routes };
