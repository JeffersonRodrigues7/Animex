import { Request, Response } from "express";
import { TopicModel } from "../models/TopicModel";
import { UserModel } from "../models/UserModel";

interface TopicCreateInterface {
  title: string;
  user_id: number;
  username: string;
}

interface FindTopicsInterface {
  offset: number;
  limit: number;
}

interface UpdateInterface {
  id: number;
  last_user_comment_name: string;
}

class TopicController {
  /**
   * Cria novo tópico
   */
  async create(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { title, user_id, username } = req.body as TopicCreateInterface;
    console.log(title, user_id, username);
    try {
      const topic: TopicModel | null = await TopicModel.create({
        title,
        last_user_comment_name: username,
        replies: 0,
        user_id,
      });
      return res.status(201).json(topic);
    } catch (error: any) {
      console.error(`Error creating new topic from user ${user_id} with title ${title}: `, error);
      return res.send(error.message);
    }
  }

  /**
   * Retorna os tópicos a partir de um range
   */
  async findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { offset, limit } = req.body as FindTopicsInterface;

    try {
      const topics: TopicModel[] = await TopicModel.findAll({
        offset: offset,
        limit: limit,
        order: [["updatedAt", "DESC"]],
        include: [{ model: UserModel, as: "user", attributes: ["id", "username", "profile_image"] }],
      });

      return topics ? res.status(200).json(topics) : res.status(204).send("Nenhum tópico para listar");
    } catch (error: any) {
      console.error(`Error listing topics from community animex: `, error);
      return res.send(error.message);
    }
  }

  /**
   * Retorna quantidade de tópicos
   */
  async findQtdTopics(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const topics_length: number = await TopicModel.count();

      return topics_length ? res.status(200).json(topics_length) : res.status(204).send("Nenhum tópico para contar");
    } catch (error: any) {
      console.error(`Error counting number of topics from animex community: `, error);
      return res.send(error.message);
    }
  }

  /**
   * Atualiza a quantidade de respostas e o nome do último usuário que comentou no tópico
   */
  async update(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { id, last_user_comment_name } = req.body as UpdateInterface;

    try {
      const topic: [affectedCount: number] = await TopicModel.update(
        {
          last_user_comment_name: last_user_comment_name,
        },
        {
          where: {
            id: id,
          },
        }
      );

      await TopicModel.increment({ replies: 1 }, { where: { id: id } });

      return topic ? res.status(204).send() : res.status(200).json(topic);
    } catch (error: any) {
      console.error(`Error updating topic data with id ${id}: `, error);
      return res.send(error.message);
    }
  }
}

export default new TopicController();
