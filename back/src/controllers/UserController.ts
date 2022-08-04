import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel";
import authConfig from "../config/jwtConfig";
const imageToBase64 = require("image-to-base64");

const profile_default_image_path = __dirname + "\\..\\static\\profile_default_image.jpg";

interface MulterRequest extends Request {
  file: Buffer;
}

interface CreateInterface {
  username: string;
  email: string;
  password: string;
  access_level: number;
  biography: string;
}

interface LoginInterface {
  email: string;
  password: string;
}

interface FindByIdInterface {
  id: number;
}

class UserController {
  /**
   * Cria um novo usuário
   */
  async create(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { username, email, password, access_level, biography } = req.body as CreateInterface;

    try {
      const default_profile_image: any = await imageToBase64(profile_default_image_path);

      const user: UserModel | null = await UserModel.create({
        username,
        email,
        password,
        access_level,
        biography,
        profile_image: default_profile_image,
      });
      return res.status(201).json(user);
    } catch (error: any) {
      console.error(`Error creating new user with username ${username}: `, error);
      return res.send(error.message);
    }
  }

  /**
   * Faz o login do usuário
   */
  async login(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { email, password } = req.body as LoginInterface;

    try {
      const user: UserModel | null = await UserModel.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const match = await bcrypt.compare(password, user.password);

        /**
         * Se o login estiver correto criamos o token de jwt usando o id(assinamos o id com o auxilio da chave secreta),
         * e enviamos o id, username e token de autorização gerado para o front-end
         */
        if (match) {
          const { id, username } = user;
          return res.json({
            user: {
              user_id: id,
              username,
            },
            token: jwt.sign({ id }, authConfig.secret, {
              expiresIn: authConfig.expiresIn,
            }),
          });
        } else {
          return res.status(203).send("Invalid password");
        }
      } else {
        return res.status(204).send("User not found");
      }
    } catch (error: any) {
      console.error(`Error trying to login user with email ${email}: `, error);
      return res.send(error.message);
    }
  }

  /**
   * Encontra um usuário pelo seu username
   */
  async findByUsername(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const username: string | undefined = req.query.username?.toString();

    try {
      const user: UserModel | null = await UserModel.findOne({
        where: {
          username: username,
        },
      });

      return user ? res.status(204).send() : res.status(200).json();
    } catch (error: any) {
      console.error(`Error trying to found user with username ${username}: `, error);
      return res.send(error.message);
    }
  }

  /**
   * Encontra um usuário pelo seu email
   */
  async findByEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const email: string | undefined = req.query.email?.toString();
    try {
      const user = await UserModel.findOne({
        where: {
          email: email,
        },
      });
      return user ? res.status(204).send() : res.status(200).json();
    } catch (error: any) {
      console.error(`Error trying to found user with email ${email}: `, error);
      return res.send(error.message);
    }
  }

  /**
   * Encontra um usuário pelo seu id
   */
  async findById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
    const { id } = req.body as FindByIdInterface;
    try {
      const user: UserModel | null = await UserModel.findOne({
        where: {
          id: id,
        },
      });

      if (user) {
        const { username, email, biography, profile_image } = user;
        return res.json({
          user: {
            id,
            username,
            email,
            biography,
            profile_image,
          },
        });
      }

      res.status(204).send(`User with id ${id} was not founded`);
    } catch (error: any) {
      console.error(`Error searching for user data with id ${id}: `, error);
      return res.send(error.message);
    }
  }

  /**
   * Atualiza dados de um usuário
   */
  async update(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const file: Buffer = (req as MulterRequest).file;
    const id: number = Number(req.body.id);

    const newProfileImage: string = Buffer.from(file.buffer).toString("base64");

    try {
      const user: [affectedCount: number] = await UserModel.update(
        {
          profile_image: newProfileImage,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return user ? res.status(204).send(`User did not founded`) : res.status(200).json(user);
    } catch (error: any) {
      console.error(`Error updating profile image of user with id ${id}: `, error);
      return res.send(error.message);
    }
  }
}

export default new UserController();
