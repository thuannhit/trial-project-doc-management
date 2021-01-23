import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcrypt-nodejs";

export interface IUser extends Document {
    email: string;
    password: string;
}

export const userSchema: Schema = new Schema({
    email: String,
    password: String,
});

userSchema.pre<IUser>("save", function save(next) {
    const user = this;

    bcrypt.genSalt(10, (err1, salt) => {
        if (err1) {
            return next(err1);
        }
        bcrypt.hash(this.password, salt, undefined, (err2: Error, hash) => {
            if (err2) {
                return next(err2);
            }
            user.password = hash;
            next();
        });
    });
});


export const User: Model<IUser> = model<IUser>("User", userSchema);
