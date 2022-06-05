import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IUser extends IBaseModel {
    ma: String;
    ten: String;
    diaChi: String;
    ghiChu?: String;
}

const schema = new Schema<IUser>({
    _id: ObjectId,
    ma: { type: String, required: true },
    ten: { type: String, required: true },
    diaChi: { type: String, required: true },
    ghiChu: String,
});

export default model<IUser>('DM_CoSoDaoTao', schema);
