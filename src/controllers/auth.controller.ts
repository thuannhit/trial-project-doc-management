import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";
import "../auth/passport.strategies";
interface ReqWithUser extends Request {
  user: {
    _id: any;
    email: string;
  };
}

export const login = async (
  req: ReqWithUser,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ status: "error", code: "unauthorized" });
  } else {
    const exprireNum = parseInt(config.jwtAccessExpires, 0);
    const token = jwt.sign({ email: user.email }, config.jwtAccessSecretKey, {
      expiresIn: exprireNum,
    });
    res
      .status(200)
      .send({ accessToken: token, user: { email: user.email, _id: user._id } });
  }
};
