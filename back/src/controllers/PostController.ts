import { Request, Response } from "express";
import { PostModel } from "../models/PostModel";

class PostController {
    async create(req: Request, res: Response) {
        try {
            const { title, text, creatorId, creatorName } = req.body;
            console.log(req.body);
            const post = await PostModel.create({
                title,
                text,
                creatorId,
                creatorName,
                lastUserPostName: creatorName,
                replies: 0,
            });
            return res.status(201).json(post);
        } catch (error: any) {
            console.error(error);
            return res.send(error.message);
        }
    }
}

export default new PostController();
