import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_GioiTinh extends IBaseModel {
    ten: String;
    ma: String;
    moTa?: String
}

const schema = new Schema<IDM_GioiTinh>({
    _id: ObjectId,
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    moTa: { type: String, required: false },
});

export default model<IDM_GioiTinh>('DM_GioiTinh', schema);
