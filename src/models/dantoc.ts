import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanToc extends IBaseModel {
    ten: String,
    moTa: String,
    soThuTu?: Number,
}

const schema = new Schema<IDanToc>({
    _id: ObjectId,
    ten: { type: String, required: true },
    soThuTu: { type: Number, required: true },
    moTa: { type: String, required: false },
});

export default model<IDanToc>('DanToc', schema);
