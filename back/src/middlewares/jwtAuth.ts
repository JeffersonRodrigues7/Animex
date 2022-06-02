import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import authConfig from "../config/jwtConfig";
import "../session-data";

interface TokenPayLoad {
    id: String;
    iat: number;
    exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Token was not provided" });
    }

    const token = authorization.replace("Bearer", "").trim();

    try {
        const data = jwt.verify(token, authConfig.secret);
        const { id } = data as TokenPayLoad;
        req.userId = id;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Invalid token" });
    }
}
