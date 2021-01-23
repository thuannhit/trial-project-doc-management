import { Document, Schema, Model, model } from "mongoose";

export interface IDocument extends Document {
    created_by: string;
    email: string;
    name: string;
    phone_number: string;
    address: string;
    ktp_number: string;
    npwp_number: string;
    passport_number: string;
    is_deleted: boolean
}

export const documentSchema: Schema = new Schema({
    created_by: String,
    email: String,
    name: String,
    phone_number: String,
    address: String,
    ktp_number: String,
    npwp_number: String,
    passport_number: String,
    is_deleted: Boolean
});

export const Documents: Model<IDocument> = model<IDocument>("Documents", documentSchema);
