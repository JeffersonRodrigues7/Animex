import express from "express";
import authMiddleware from "./middlewares/jwtAuth";
import UserController from "./controllers/UserController";
import TopicController from "./controllers/TopicController";
import CommentController from "./controllers/CommentController";
const multer = require("multer");

/**
 * Multer é um middleware node.js para manipulação de dados multipart/form-data,
 * que é usado principalmente para fazer upload de arquivos.
 */
const upload = multer({ storage: multer.memoryStorage() });

const routes = express.Router();

//UserController: Rotas de controle de usuário
routes.post("/register", UserController.create);
routes.get("/users/username/:username", UserController.findByUsername);
routes.get("/users/email/:email", UserController.findByEmail);
routes.post("/login", UserController.login);
routes.post("/users/id", authMiddleware, UserController.findById);
routes.patch("/update", authMiddleware, upload.single("profileImage"), UserController.update);

//TopicController: Rotas de controle de tópicos
routes.post("/new-topic", authMiddleware, TopicController.create);
routes.post("/list-topics", authMiddleware, TopicController.findAll);
routes.post("/qtd-topics", authMiddleware, TopicController.findQtdTopics);
routes.patch("/update-topic", authMiddleware, TopicController.update);

//CommentController: Rotas de controle de comentários
routes.post("/new-comment", authMiddleware, CommentController.create);
routes.post("/list-comments", authMiddleware, CommentController.findComments);
routes.post("/qtd-comments", authMiddleware, CommentController.findQtdComments);
routes.post("/get-tweet", authMiddleware, CommentController.getTweet);

export { routes };
