import { NextFunction, Request, Response } from "express";
import { Documents } from "../models/document";
import * as jwt from "jsonwebtoken";
import config from "../config";
interface ReqWithUser extends Request {
    user: {
        email: string,
        _id: string
    }
}
interface NewDocDTO {
    email: string;
    name: string;
    phone_number: string;
    address: string;
    ktp_number: string;
    npwp_number: string;
    passport_number: string;
}
export const createNewDoc = async (req: ReqWithUser, res: any) => {
    const body: NewDocDTO = req.body
    const rs = await Documents.create({
        created_by: req.user._id,
        name: body.name,
        address: body.address,
        phone_number: body.phone_number,
        passport_number: body.passport_number,
        npwp_number: body.npwp_number,
        ktp_number: body.ktp_number,
        email: body.email
    });

    res.status(200).send({ document: rs });
}

export const getUsersList = async (req: any, res: any) => {

    const rs = await Documents.find();

    res.status(200).send({ users: rs });
    // tslint:disable-next-line:no-console
    console.log('Enter user')
}