import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_TrinhDoDaoTao extends IBaseModel {
    ten: String,
    ma: String,
    capDo: Number,
}

const schema = new Schema<IDM_TrinhDoDaoTao>({
    _id: ObjectId,
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    capDo: { type: Number, required: true },
});

export default model<IDM_TrinhDoDaoTao>('DM_TrinhDoDaoTao', schema);
