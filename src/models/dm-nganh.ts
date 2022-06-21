import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_Nganh extends IBaseModel {
    ten: String,
    ma: String,
    idTrinhDoDaoTao: String,
    maNganhTheoBo: String,
    tenNganhTA?: String,
}

const schema = new Schema<IDM_Nganh>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    idTrinhDoDaoTao: { type: String, required: true },
    maNganhTheoBo: { type: String, required: true },
    tenNganhTA: { type: String, required: false },
});

export default model<IDM_Nganh>('DM_Nganh', schema);
