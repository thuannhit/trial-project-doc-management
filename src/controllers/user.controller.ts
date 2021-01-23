import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/user";
import * as jwt from "jsonwebtoken";
import config from "../config";

export const createUser = async (req: Request, res: Response) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    const rs = await User.create({
        email: req.body.email,
        password: hashedPassword,

    });

    const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, config.jwtAccessSecretKey);
    res.status(200).send({ token, user: rs });
}

export const getUsersList = async (req: Request, res: Response) => {
    const rs = await User.find().select('-password');
    res.status(200).send({ users: rs });
}

export const getOneUser = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const rs = await User.findOne({ _id: userId});
    res.status(200).send({ user: {emai: rs.email, _id: rs._id} });
}