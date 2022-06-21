import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_KhuVuc extends IBaseModel {
    ten: String,
    ma: String,
}

const schema = new Schema<IDM_KhuVuc>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    ma: { type: String, required: true },
});

export default model<IDM_KhuVuc>('DM_KhuVuc', schema);
