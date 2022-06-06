import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IUser extends IBaseModel {
    ten: String,
    avatar?: String,
    username: String,
    password: String,
    dob?: Date,
    age?: Number,
    idLoai?: String,
    idTinh?: String,
    idHuyen?: String,
    idXa?: String,
}

const schema = new Schema<IUser>({
    _id: ObjectId,
    ten: { type: String, required: true },
    avatar: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: false },
    age: { type: Number, required: false },
    idLoai: { type: String, required: false },
    idTinh: { type: String, required: false },
    idHuyen: { type: String, required: false },
    idXa: { type: String, required: false },
});

export default model<IUser>('User', schema);
