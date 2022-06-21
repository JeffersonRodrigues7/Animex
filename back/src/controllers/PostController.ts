import { Request, Response } from "express";
import { PostModel } from "../models/PostModel";
import { UserModel } from "../models/UserModel";
import UserController from "./UserController";

class PostController {
  async create(req: Request, res: Response) {
    try {
      const { title, text, creatorId, creatorName } = req.body;

      const post = await PostModel.create({
        title,
        text,
        lastUserPostName: creatorName,
        replies: 0,
        creatorId,
      });
      return res.status(201).json(post);
    } catch (error: any) {
      console.error(error);
      return res.send(error.message);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const posts = await PostModel.findAll({
        order: [["updatedAt", "DESC"]],
        include: { model: UserModel, attributes: ["id", "userName", "profileImage"] },
      });

      return posts ? res.status(200).json(posts) : res.status(204).send("Nenhum post para listar");
    } catch (error: any) {
      console.error("Erro ao listar tópicos: ", error);
      return res.send(error.message);
    }
  }
}

export default new PostController();
