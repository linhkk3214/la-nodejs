import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_KhoaHoc extends IBaseModel {
    ten: String,
    ma: String,
    namHocBatDau: Number,
    idHeDaoTao: String
}

const schema = new Schema<IDM_KhoaHoc>({
    _id: ObjectId,
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    namHocBatDau: { type: Number, required: true },
    idHeDaoTao: { type: String, required: true },
});

export default model<IDM_KhoaHoc>('DM_KhoaHoc', schema);
