import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import * as jwt from "jsonwebtoken";
import config from "../config";

export const createUser = async (req: any, res: any) => {
    const a = 1;
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    const rs = await User.create({
        email: req.body.email,
        password: hashedPassword,

    });

    const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, config.jwtAccessSecretKey);
    res.status(200).send({ token, user: rs });
    // tslint:disable-next-line:no-console
    console.log('Enter user')
}

export const getUsersList = async (req: any, res: any) => {

    const rs = await User.find();

    res.status(200).send({ users: rs });
    // tslint:disable-next-line:no-console
    console.log('Enter user')
}