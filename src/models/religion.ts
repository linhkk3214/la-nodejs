import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IReligion extends IBaseModel {
    ten: String,
    ma: String,
    soThuTu?: Number,
}

const schema = new Schema<IReligion>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    soThuTu: { type: Number, required: false },
});

export default model<IReligion>('Religion', schema);
