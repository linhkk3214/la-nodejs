import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_HeDaoTao extends IBaseModel {
    ten: String;
    ma: String;
    tenTiengAnh?: String;
}

const schema = new Schema<IDM_HeDaoTao>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    tenTiengAnh: { type: String, required: false },
});

export default model<IDM_HeDaoTao>('DM_HeDaoTao', schema);
