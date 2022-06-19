import express from "express";
import UserController from "./controllers/UserController";
import UserPost from "./controllers/PostController";
import authMiddleware from "./middlewares/jwtAuth";
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const routes = express.Router();

//UserController
routes.post("/register", UserController.create);
routes.get("/users/userName/:userName", UserController.findByUserName);
routes.get("/users/email/:email", UserController.findByEmail);
routes.post("/login", UserController.login);
routes.post("/users/id", authMiddleware, UserController.findById);
routes.post("/update", authMiddleware, upload.single("profileImage"), UserController.update);

//PostController
routes.post("/newpost", authMiddleware, UserPost.create);
routes.post("/list", authMiddleware, UserPost.findAll);

export { routes };
