import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).send();
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: string, decoded: any) => {
    if (err) return res.status(403).send();

    req.id = decoded.subject;
    next();
  });
};

export default AuthMiddleware;
