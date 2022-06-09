import express from "express";
import UserController from "./controllers/UserController";
import UserPost from "./controllers/PostController";
import authMiddleware from "./middlewares/jwtAuth";

const routes = express.Router();

//UserController
routes.post("/register", authMiddleware, UserController.create);
routes.get("/users/userName/:userName", UserController.findByUserName);
routes.get("/users/email/:email", UserController.findByEmail);
routes.post("/login", UserController.login);

//PostController
routes.post("/newpost", authMiddleware, UserPost.create);

export { routes };
