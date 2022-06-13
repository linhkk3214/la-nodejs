import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_CoSoDaoTao extends IBaseModel {
    ma: String;
    ten: String;
    diaChi: String;
    ghiChu?: String;
}

const schema = new Schema<IDM_CoSoDaoTao>({
    _id: ObjectId,
    ma: { type: String, required: true },
    ten: { type: String, required: true },
    diaChi: { type: String, required: true },
    ghiChu: String,
});

export default model<IDM_CoSoDaoTao>('DM_CoSoDaoTao', schema);
