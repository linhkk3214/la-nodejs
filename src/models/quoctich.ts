import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IQuocTich extends IBaseModel {
    ten: String,
    moTa: String,
    soThuTu?: Number,
}

const schema = new Schema<IQuocTich>({
    _id: ObjectId,
    ten: { type: String, required: true },
    soThuTu: { type: Number, required: true },
});

export default model<IQuocTich>('QuocTich', schema);