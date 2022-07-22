import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IUser extends IBaseModel {
    ten: String,
    ho: String,
    hoVaTen: string;
    avatar?: String,
    username: String,
    password: String,
    ngaySinh?: Date,
    gioiTinh?: String,
    sdt?: String,
    idLoai?: String,
    idTinh?: String,
    idHuyen?: String,
    idXa?: String,
    email?: String,
    ghiChu?: String

}

const schema = new Schema<IUser>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    ho: { type: String, required: true },
    hoVaTen: { type: String, required: true },
    avatar: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
    ngaySinh: { type: Date, required: false },
    gioiTinh: { type: String, required: false },
    sdt: { type: String, required: false },
    idLoai: { type: String, required: false },
    idTinh: { type: String, required: false },
    idHuyen: { type: String, required: false },
    idXa: { type: String, required: false },
    email: { type: String, required: false },
    ghiChu: { type: String, required: false },
});

export default model<IUser>('User', schema);
