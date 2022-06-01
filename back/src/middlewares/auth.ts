import jwt from "jsonwebtoken";
import "..//session-data";
import express, { NextFunction, Request, Response } from "express";
import authConfig from "../config/auth";
import { promisify } from "util";

interface TokenPayLoad {
    id: String;
    iat: number;
    exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    console.log(req.headers);
    if (!authorization) {
        return res.status(401).json({ error: "Token was not provided" });
    }

    const token = authorization.replace("Bearer", "").trim();

    try {
        const data = jwt.verify(token, "abc123");
        const { id } = data as TokenPayLoad;
        req.userId = id;
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}
