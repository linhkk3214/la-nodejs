import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_DoiTuongDaoTao extends IBaseModel {
    ten: String;
    ma: String;
    idHeDaoTao: String;
    soKyHieu?: String;
}

const schema = new Schema<IDM_DoiTuongDaoTao>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    idHeDaoTao: { type: String, required: true },
    soKyHieu: String,
});

export default model<IDM_DoiTuongDaoTao>('DM_DoiTuongDaoTao', schema);
