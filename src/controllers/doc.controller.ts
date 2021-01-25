import { NextFunction, Request, Response } from "express";
import { Documents } from "../models/document";
import * as jwt from "jsonwebtoken";
import config from "../config";
interface ReqWithUser extends Request {
    user: {
        email: string;
        _id: string;
    };
}
interface NewDocDTO {
    email?: string;
    name?: string;
    phone_number?: string;
    address?: string;
    ktp_number?: string;
    npwp_number?: string;
    passport_number?: string;
}

export const createNewDoc = async (req: ReqWithUser, res: any) => {
    const body: NewDocDTO = req.body;
    const rs = await Documents.create({
        created_by: req.user._id,
        name: body.name,
        address: body.address,
        phone_number: body.phone_number,
        passport_number: body.passport_number,
        npwp_number: body.npwp_number,
        ktp_number: body.ktp_number,
        email: body.email,
        is_deleted: false
    });

    res.status(200).send({ document: rs });
};

export const getDoccuments = async (req: ReqWithUser, res: any) => {
    const query = req.query
    const limit: number = query.limit ? Number(query.limit): 10
    const offset: number = query.offset ? Number(query.offset): 0
    const nameString = query.nameString ? query.nameString.toString() : ''
    const reg=  new RegExp(nameString);

    const total = await Documents.find({ created_by: req.user._id, is_deleted: false, email: reg }).count()

    const rs = await Documents.find({ created_by: req.user._id, is_deleted: false, email: reg }).skip(offset).limit(limit);

    res.status(200).send({ documents: rs, total, limit, offset});
};

export const getDoccument = async (req: ReqWithUser, res: any) => {
    const docId = req.params.id;
    const rs = await Documents.findOne({ created_by: req.user._id, _id: docId, is_deleted: false });

    res.status(200).send({ document: rs });
};

export const updateDocumentAllProperties = async (
    req: ReqWithUser,
    res: any
) => {
    const docId = req.params.id;
    const body = req.body;
    const oNewDate: NewDocDTO = {
        name: body.name,
        email: body.email,
        address: body.address,
        phone_number: body.phone_number,
        passport_number: body.passport_number,
        npwp_number: body.npwp_number,
        ktp_number: body.ktp_number,
    };
    const rs = await Documents.updateOne({ _id: docId }, oNewDate);

    res.status(200).send({ document: rs });
    // tslint:disable-next-line:no-console
    console.log("Finished updating");
};

export const deleteDocument = async (
    req: ReqWithUser,
    res: any
) => {

    // tslint:disable-next-line:no-console
    console.log("Delete");
    const docId = req.params.id;
    const rs = await Documents.updateOne({ _id: docId }, { is_deleted: true });

    res.status(200).send({ document: rs });
};

export const updateDocumentSomeProperties = async (
    req: ReqWithUser,
    res: any
) => {
    const docId = req.params.id;
    const body = req.body;

    const oNewDate: NewDocDTO = {};
    if (body.name != null && body.name !== undefined) {
        oNewDate.name = body.name;
    }
    if (body.email != null && body.email !== undefined) {
        oNewDate.email = body.email;
    }
    if (body.address != null && body.address !== undefined) {
        oNewDate.address = body.address;
    }
    if (body.phone_number != null && body.phone_number !== undefined) {
        oNewDate.phone_number = body.phone_number;
    }
    if (body.passport_number != null && body.passport_number !== undefined) {
        oNewDate.passport_number = body.passport_number;
    }
    if (body.npwp_number != null && body.npwp_number !== undefined) {
        oNewDate.npwp_number = body.npwp_number;
    }
    if (body.ktp_number != null && body.ktp_number !== undefined) {
        oNewDate.ktp_number = body.ktp_number;
    }
    const rs = await Documents.updateOne({ _id: docId }, oNewDate);

    res.status(200).send({ document: rs });
};
