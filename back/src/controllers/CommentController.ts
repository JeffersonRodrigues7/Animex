import { Request, Response } from "express";
import { CommentModel } from "../models/CommentModel";
import { PostModel } from "../models/PostModel";
import { UserModel } from "../models/UserModel";

class CommentController {
  async create(req: Request, res: Response) {
    try {
      const { text, postId, userId } = req.body;

      const comment = await CommentModel.create({
        text,
        postId,
        userId,
      });

      return res.status(201).json(comment);
    } catch (error: any) {
      console.error(error);
      return res.send(error.message);
    }
  }

  async findComments(req: Request, res: Response) {
    const { id, offset, limit } = req.body;

    try {
      const comments = await CommentModel.findAll({
        where: {
          postId: id,
        },
        offset: offset,
        limit: limit,
        order: [["createdAt", "ASC"]],
        include: [
          { model: PostModel, attributes: ["text", "createdAt"] },
          { model: UserModel, attributes: ["userName", "profileImage"] },
        ],
      });

      return comments ? res.status(200).json(comments) : res.status(204).send("Nenhum comentário para listar");
    } catch (error: any) {
      console.error("Erro ao listar comentários: ", error);
      return res.send(error.message);
    }
  }

  async findQtdComments(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const commentslength = await CommentModel.count({
        where: { postId: id },
      });

      return commentslength ? res.status(200).json(commentslength) : res.status(204).send("Nenhum comentário para contar");
    } catch (error: any) {
      console.error("Erro ao contar qtd de comentários: ", error);
      return res.send(error.message);
    }
  }
}

export default new CommentController();
