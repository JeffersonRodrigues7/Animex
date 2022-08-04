import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import authConfig from "../config/jwtConfig";
import "../session-data";

/**
 * Basicamente é o tipo de dado retornado pela verificação jwt,
 * entre elas está o valor que foi utilizado para assinar o token jwt durante a autenticação,
 * no caso é o id de usuário, iat é o tempo que o token foi criado, e exp é o tempo de expiração do token
 */
interface TokenPayLoad {
  id: String;
  iat: number;
  exp: number;
}

/**
 * Middleware de autorização que será utilizado em todas as rotas protegidas,
 * para que a próxima função seja chamada, o usuário precisará ter fornecido um token jwt válido
 */
export default function authMiddleware(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token was not provided" });
  }

  const token: string = authorization.replace("Bearer", "").trim();

  try {
    /**
     * Verifica se o token provido é válido, se sim,
     * pegamos o id de usuário desse token e o colocamos no corpo da requisição(aqui não está sendo usado)
     */
    const data: string | jwt.JwtPayload = jwt.verify(token, authConfig.secret);
    const { id } = data as TokenPayLoad;
    req.user_id = id; //Não está sendo usado para nada
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
}
