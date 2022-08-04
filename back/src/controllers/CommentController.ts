import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { CommentModel } from "../models/CommentModel";
import { TopicModel } from "../models/TopicModel";
import { UserModel } from "../models/UserModel";

interface CommentCreateInterface {
  text: string;
  user_id: number;
  topic_id: number;
}

interface FindCommentsInterface {
  id: number;
  offset: number;
  limit: number;
}

interface FindQtdCommentsInterface {
  id: number;
}

interface GetTweetInterface {
  url: string;
}

class CommentController {
  /**
   * Cria novo comentário
   */
  async create(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { text, user_id, topic_id } = req.body as CommentCreateInterface;
    try {
      const comment: CommentModel | null = await CommentModel.create({
        text,
        user_id,
        topic_id,
      });

      const { id } = comment;

      const complete_comment: CommentModel | null = await CommentModel.findOne({
        where: {
          id: id,
        },
        include: [{ model: UserModel, as: "user", attributes: ["username", "profile_image"] }],
      });

      return res.status(201).json(complete_comment);
    } catch (error: any) {
      console.error(`Error creating new comment from user ${user_id} and topic ${topic_id}: `, error);
      return res.send(error.message);
    }
  }
  /**
   * Retorna comentários de um tópico a partir de um id e um range
   */
  async findComments(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { id, offset, limit } = req.body as FindCommentsInterface;

    try {
      const comments: CommentModel[] | null = await CommentModel.findAll({
        where: {
          topic_id: id,
        },
        offset: offset,
        limit: limit,
        order: [["createdAt", "ASC"]],
        include: [{ model: UserModel, as: "user", attributes: ["username", "profile_image"] }],
      });

      return comments ? res.status(200).json(comments) : res.status(204).send("Nenhum comentário para listar");
    } catch (error: any) {
      console.error(`Error listing topic comments with id ${id}: `, error);
      return res.send(error.message);
    }
  }

  /**
   * Retorna a quantidade de comentários de um tópico especifico
   */
  async findQtdComments(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { id } = req.body as FindQtdCommentsInterface;

    try {
      const comments_length: number = await CommentModel.count({
        where: { topic_id: id },
      });

      return comments_length ? res.status(200).json(comments_length) : res.status(204).send("Nenhum comentário para contar");
    } catch (error: any) {
      console.error(`Error counting number of topic comments with id ${id}: `, error);
      return res.send(error.message);
    }
  }

  /**
   * Retorna dados de um tweet a partir de uma url
   */
  async getTweet(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { url } = req.body as GetTweetInterface;

    try {
      const response: AxiosResponse = await axios.get(url);
      const encoded_html_response: string = encodeURIComponent(response.data.html);
      return res.send(encoded_html_response);
    } catch (error: any) {
      console.error(`Error finding tweet with url ${url}: `, error);
      return res.send(error.message);
    }
  }
}

export default new CommentController();
