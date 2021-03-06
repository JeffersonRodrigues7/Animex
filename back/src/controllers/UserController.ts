import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel";
import authConfig from "../config/jwtConfig";
const imageToBase64 = require("image-to-base64");

const profile_default_image_path = __dirname + "\\..\\static\\profile_default_image.jpg";

interface MulterRequest extends Request {
  file: any;
}

class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user: any = await UserModel.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          const { id, userName } = user;
          return res.json({
            user: {
              id,
              userName,
            },
            token: jwt.sign({ id }, authConfig.secret, {
              expiresIn: authConfig.expiresIn,
            }),
          });
        } else {
          return res.status(203).send("Senha inválida");
        }
      } else {
        return res.status(204).send("Usuário não encontrado");
      }
    } catch (error: any) {
      console.error("Erro ao tentar fazer login: ", error);
      return res.send(error.message);
    }
  }

  async findByUserName(req: Request, res: Response) {
    const userName = req.query.userName?.toString();
    try {
      const user = await UserModel.findOne({
        where: {
          userName: userName,
        },
      });

      return user ? res.status(204).send() : res.status(200).json(user);
    } catch (error: any) {
      console.error("Erro ao encontrar usuário pelo nome: ", error);
      return res.send(error.message);
    }
  }

  async findByEmail(req: Request, res: Response) {
    const email = req.query.email?.toString();
    try {
      const user = await UserModel.findOne({
        where: {
          email: email,
        },
      });
      return user ? res.status(204).send() : res.status(200).json(user);
    } catch (error: any) {
      console.error("Erro ao encontrar usuário pelo e-mail: ", error);
      return res.send(error.message);
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const user: any = await UserModel.findOne({
        where: {
          id: id,
        },
      });

      if (user) {
        const { userName, email, biography, profileImage } = user;

        return res.json({
          user: {
            id,
            userName,
            email,
            biography,
            profileImage,
          },
        });
      }

      res.status(204).send("Usuário não encontrado");
    } catch (error: any) {
      console.error("Erro ao encontrar dados de usuário: ", error);
      return res.send(error.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { userName, email, password, userLevel, biography, profileImage } = req.body;

      const default_profile_image = await imageToBase64(profile_default_image_path);

      const user = await UserModel.create({
        userName,
        email,
        password,
        userLevel,
        biography,
        profileImage: default_profile_image,
      });
      return res.status(201).json(user);
    } catch (error: any) {
      console.error(error);
      return res.send(error.message);
    }
  }

  async update(req: Request, res: Response) {
    const file = (req as MulterRequest).file;
    const userId = Number(req.body.userId);

    const newProfileImage = Buffer.from(file.buffer).toString("base64");

    try {
      const user = await UserModel.update(
        {
          profileImage: newProfileImage,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      return user ? res.status(204).send() : res.status(200).json(user);
    } catch (error: any) {
      console.error("Erro ao fazer update de foto de perfil: ", error);
      return res.send(error.message);
    }
  }
  async delete(req: Request, res: Response) {}
  async findAll(req: Request, res: Response) {}
}

export default new UserController();
