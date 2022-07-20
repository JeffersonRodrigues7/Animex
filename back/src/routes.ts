import express, { Router } from "express";
import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";
import authMiddleware from "./middlewares/jwtAuth";
import CommentController from "./controllers/CommentController";
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const routes = express.Router();

//UserController
routes.post("/register", UserController.create);
routes.get("/users/userName/:userName", UserController.findByUserName);
routes.get("/users/email/:email", UserController.findByEmail);
routes.post("/login", UserController.login);
routes.post("/users/id", authMiddleware, UserController.findById);
routes.patch("/update", authMiddleware, upload.single("profileImage"), UserController.update);

//PostController
routes.post("/newpost", authMiddleware, PostController.create);
routes.post("/listPosts", authMiddleware, PostController.findAll);
routes.post("/qtdPosts", authMiddleware, PostController.findQtdPosts);
routes.patch("/updatePost", authMiddleware, PostController.update);

//CommentController
routes.post("/newcomment", authMiddleware, CommentController.create);
routes.post("/listComments", authMiddleware, CommentController.findComments);
routes.post("/qtdComments", authMiddleware, CommentController.findQtdComments);
routes.post("/getTweet", authMiddleware, CommentController.getTweet);

export { routes };
