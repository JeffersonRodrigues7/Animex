import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";

const bcrypt = require("bcryptjs");

export var authenticated: boolean;

class UserController {
    async findLogin(req: express.Request, res: express.Response) {
        const { email, password } = req.body;

        console.log("aqui");
        try {
            const user: any = await UserModel.findOne({
                where: {
                    email: email,
                },
            });

            if (user) {
                const match = await bcrypt.compare(password, user.password);

                if (match) {
                    const id = user.id;
                    return res.json({
                        user: {
                            id,
                            email,
                        },
                        token: jwt.sign({ id }, "abc123", {
                            expiresIn: "7d",
                        }),
                    });
                } else {
                    return res.status(203).send("Senha inválida");
                }
            } else {
                authenticated = false;
                return res.status(204).send("Usuário não encontrado");
            }
        } catch (error: any) {
            authenticated = false;
            console.error("Erro ao tentar fazer login: ", error);
            return res.send(error.message);
        }
    }

    async findOneByName(req: Request, res: Response) {
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

    async findOneByEmail(req: Request, res: Response) {
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

    async create(req: Request, res: Response) {
        try {
            const { userName, email, password } = req.body;
            const user = await UserModel.create({
                userName,
                email,
                password,
            });
            return res.status(201).json(user);
        } catch (error: any) {
            console.error(error);
            return res.send(error.message);
        }
    }

    async update(req: Request, res: Response) {}
    async delete(req: Request, res: Response) {}
    async findAll(req: Request, res: Response) {}
    async findOne(req: Request, res: Response) {}
}

export default new UserController();
